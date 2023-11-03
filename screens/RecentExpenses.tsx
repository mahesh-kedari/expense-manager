import { StyleSheet, Text, View } from "react-native";
import React from "react";
import ExpensesOutput from "../components/expenses/ExpensesOutput";

type Props = {};

const RecentExpenses = (props: Props) => {
  return <ExpensesOutput expensePeriod="Last 7 days" />;
};

export default RecentExpenses;

const styles = StyleSheet.create({});
