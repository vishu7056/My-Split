import axios from "axios";

const BACKEND_URl = 'https://my-split-2e747-default-rtdb.firebaseio.com'

export async function storeExpense(expenseData) {
 const response = await axios.post(
    BACKEND_URl + '/expenses.json',expenseData  );
    const id = response.data.name;
    return id;
}

export async function fetchExpenses() {
  const response = await axios.get(
        BACKEND_URl + '/expenses.json' );

        const expenses = [];

        for(const key in response.data) {
            const expensesObj = {
                id: key,
                amount: response.data[key].amount,
                date: Date(response.data[key].date),
                description: response.data[key].description
            };
            expenses.push(expensesObj);
        }

        return expenses;

        
}
export  function updateExpense(id, expenseData) {
    return axios.put(
        BACKEND_URl + `/expenses/${id}.json`, expenseData );
}

       export  function deleteExpense(id) {
   return axios.delete(BACKEND_URl + `/expenses/${id}.json`);
       }                