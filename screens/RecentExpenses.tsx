import { StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import ExpensesOutput from "../components/expenses/ExpensesOutput";
import { ExpenseContext } from "../store/expense-context";
import { getDateMinusDays } from "../utils/date";
import { fetchExpenses } from "../utils/http";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import ErrorOverlay from "../components/UI/ErrorOverlay";

type Props = {};

const RecentExpenses = (props: Props) => {
  const [isFetching, setIsFetching] = useState<boolean>(true);
  const [error, setError] = useState(null);
  const expenseCtx = useContext(ExpenseContext);
  const recentExpense = expenseCtx.expenses.filter((expense) => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDays(today, 7);
    return expense.date > date7DaysAgo && expense.date <= today;
  });

  useEffect(() => {
    async function getExpenses() {
      setIsFetching(true);
      try {
        const expenses = await fetchExpenses();
        expenseCtx.setExpenses(expenses);
      } catch (error: any) {
        setError(error.message);
      }
      setIsFetching(false);
    }
    getExpenses();
  }, []);
  const onError = () => {
    setError(null);
  };

  if (isFetching) {
    return <LoadingOverlay />;
  } else if (!!error) {
    return <ErrorOverlay message={error} onConfirm={onError} />;
  } else {
    return (
      <ExpensesOutput
        expenses={recentExpense}
        expensePeriod="Last 7 days"
        fallbackText="No expenses in last 7 days"
      />
    );
  }
};

export default RecentExpenses;

const styles = StyleSheet.create({});
