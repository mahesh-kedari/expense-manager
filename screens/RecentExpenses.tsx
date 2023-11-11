import { StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import ExpensesOutput from "../components/expenses/ExpensesOutput";
import { ExpenseContext } from "../store/expense-context";
import { getDateMinusDays } from "../utils/date";

type Props = {};

const RecentExpenses = (props: Props) => {
  const expenseCtx = useContext(ExpenseContext);
  const recentExpense = expenseCtx.expenses.filter((expense) => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDays(today, 7);
    return expense.date > date7DaysAgo && expense.date <= today;
  });
  return (
    <ExpensesOutput
      expenses={recentExpense}
      expensePeriod="Last 7 days"
      fallbackText="No expenses in last 7 days"
    />
  );
};

export default RecentExpenses;

const styles = StyleSheet.create({});
