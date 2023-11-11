import { StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import ExpensesOutput from "../components/expenses/ExpensesOutput";
import { ExpenseContext } from "../store/expense-context";

type Props = {};

const AllExpenses = (props: Props) => {
  const expenseCtx = useContext(ExpenseContext);
  return (
    <ExpensesOutput
      expenses={expenseCtx.expenses}
      expensePeriod={"Total"}
      fallbackText="No expenses recorded so far"
    />
  );
};

export default AllExpenses;

const styles = StyleSheet.create({});
