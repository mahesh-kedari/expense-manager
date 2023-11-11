import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import ExpensesSummary from "./ExpensesSummary";
import ExpensesList from "./ExpensesList";
import { GlobalStyles } from "../../constants/styles";
import { DUMMY_EXPENSES } from "../../store/dummy-expenses";

type Props = {
  expenses?: Array<Expense>;
  expensePeriod: any;
  fallbackText?: string;
};
const ExpensesOutput = ({
  expenses = [],
  expensePeriod,
  fallbackText = "No expenses found",
}: Props) => {
  return (
    <View style={styles.container}>
      <ExpensesSummary expenses={expenses} periodName={expensePeriod} />
      {expenses.length === 0 ? (
        <Text style={styles.infoText}>{fallbackText}</Text>
      ) : (
        <ExpensesList expenses={expenses} />
      )}
    </View>
  );
};

export default ExpensesOutput;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 0,
    backgroundColor: GlobalStyles.colors.primary800,
  },
  infoText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
    marginTop: 32,
  },
});
