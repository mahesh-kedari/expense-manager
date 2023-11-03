import { StyleSheet, Text, View } from "react-native";
import React from "react";
import ExpensesOutput from "../components/expenses/ExpensesOutput";

type Props = {};

const AllExpenses = (props: Props) => {
  return <ExpensesOutput expensePeriod={"Total"} />;
};

export default AllExpenses;

const styles = StyleSheet.create({});
