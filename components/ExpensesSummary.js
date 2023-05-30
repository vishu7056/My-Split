import { View, Text, StyleSheet } from "react-native";

import { GlobalStyles } from "../constants/styles";

function ExpensesSummary ({expenses, periodName }) {
const expensesSum = expenses.reduce((sum, expense) => {
    return sum + expense.amount
},0);                    //Combine Multiple value in single  number, automatically reciver current value

    return (
        <View style={styles.container}>
        <Text style={styles.period}>{periodName}</Text>
        <Text style={styles.sum}>${expensesSum.toFixed(2)}</Text>     
        {/* toFixed function roundOff function to the amount */}
    </View>
    );
}

export default ExpensesSummary;

const styles = StyleSheet.create({
 container:{
    padding: 8,
    backgroundColor: GlobalStyles.colors.primary50,
    borderRadius: 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
 },
 period:{
    fontSize: 12,
    color: GlobalStyles.colors.primary400
 },
 sum:{
    fontSize: 16,
    fontWeight: 'bold',
    color: GlobalStyles.colors.primary500
 }
});