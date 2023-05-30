import { useContext, useState, useEffect } from "react";

import { ExpensesContext } from "../store/expense-context";
import ExpensesOutput from "../components/ExpensesOutput";
import { getDateMinusDays } from "../util/date";
import { fetchExpenses } from "../util/http";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import ErrorOverlay from "../components/UI/ErrorOverlay";

function RecentExpenses(){
  const [isFetching, setIsFetching] = useState(true);
const [error, setError] = useState();

 const expensesCtx = useContext( ExpensesContext);
// const [fetchedExpenses, setFetchedExpenses] = useState();

 useEffect(() => {
 async function getExpenses(){
  setIsFetching(true);
  try{
    const expenses = await fetchExpenses();
    expensesCtx.setExpenses(expenses);
  } catch (error) {
  setError('Could not fetch expenses!');
}
    setIsFetching(false);

    // setFetchedExpenses(expenses);
  }

  getExpenses();
 }, []);

 if(error && !isFetching) {
  return <ErrorOverlay />;
 }
<ErrorOverlay message={error} />

//  function errorHandler(){
//   setError(null);
//  }

 if(isFetching) {
  return <LoadingOverlay message={error}  />;
 }

const recentExpenses = expensesCtx.expenses.filter((expense) => {
  const today = new Date();
  const date7DaysAgo = getDateMinusDays( today, 7);

  return expense.date >= date7DaysAgo && expense.date <= today ;
});

return(
  <ExpensesOutput 
  expenses={recentExpenses} 
  expensesPeriod="Last 7 Days" 
  fallbackText="No expenses registered for the last 7 days."
    />
);
}

export default RecentExpenses;