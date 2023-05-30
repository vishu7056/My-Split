import { View, StyleSheet,  } from "react-native";
import { useLayoutEffect, useContext, useState } from "react";

import IconButton from "../components/UI/IconButton";
import { GlobalStyles } from "../constants/styles";
import { ExpensesContext } from "../store/expense-context";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";
import { storeExpense, updateExpense, deleteExpense } from "../util/http";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import ErrorOverlay from "../components/UI/ErrorOverlay";

function ManageExpense({route, navigation}) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState();

  const expensesCtx = useContext(ExpensesContext);
  
  const editedExpenseId  = route.params?.expenseId;
  const isEditing = !!editedExpenseId;

  const selectedExpense = expensesCtx.expenses.find(
    (expense) => expense.id === editedExpenseId 
  );

useLayoutEffect(() => {
    navigation.setOptions({
        title:  isEditing ? 'Edit Expense' : 'Add Expense',
    });
  }, [navigation, isEditing]);

async function deleteExpenseHandler() {
  setIsSubmitting(true);
  try{
    await deleteExpense(editedExpenseId);
    expensesCtx.deleteExpense(editedExpenseId);
    navigation.goBack();
  }catch (error) {
   setError(' Could not delete expense - please try again later!')
  }
  
 setIsSubmitting(false);

}

function cancelHandler(){ 
  navigation.goBack();
}

if(isSubmitting) {
  return <LoadingOverlay />;
}
async function confirmHandler(expenseData){
  setIsSubmitting(true);
  try{
    if (isEditing) {
      expensesCtx.updateExpense(editedExpenseId, expenseData);
      await updateExpense(editedExpenseId, expenseData);
    } else{
     const id = await storeExpense(expenseData);
      expensesCtx.addExpense({...expenseData, id: id});
    }
    navigation.goBack();
  } catch (error) {
    setError('Could not save data - please try again later! ')
    setIsSubmitting(false);
  }
  }
  

// function errorHandler(){
//   setError(null);
// }

if(error && !isSubmitting) {
  return <ErrorOverlay message={error}  />;
}

return(
<View style={styles.Container}>
  <ExpenseForm
   submitButtonLabel={isEditing ? 'update' : 'Add'}
   onSubmit={confirmHandler}
   onCancel={cancelHandler} 
   defaultValues={selectedExpense}
   />
    {isEditing && (
    <View style={styles.deleteContainer}>
    <IconButton 
    icon="trash" 
    color={GlobalStyles.colors.error500} 
    size={36} 
    onPress={deleteExpenseHandler} 
    />
    </View>
    )}
</View>
);
}

export default ManageExpense;

const styles = StyleSheet.create({
    Container:{
        flex: 1,
        padding: 24,
        backgroundColor: GlobalStyles.colors.primary800
    },
    
    deleteContainer:{
       marghinTop: 16,
       paddignTop: 8,
       borderTopWidth: 2,
       borderTopColor: GlobalStyles.colors.primary200,
       alignItems: 'center'        
    }
});