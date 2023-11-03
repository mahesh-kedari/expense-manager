import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import ExpensesSummary from "./ExpensesSummary";
import ExpensesList from "./ExpensesList";

type Props = {
  expenses: Array<any>;
};

const ExpensesOutput = ({ expenses }: Props) => {
  return (
    <View>
      <ExpensesSummary />
      <ExpensesList expenses={expenses} />
    </View>
  );
};

export default ExpensesOutput;

const styles = StyleSheet.create({});
