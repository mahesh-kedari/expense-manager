/**
 *
 */
import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import ExpenseItem from "./ExpenseItem";

type Props = {
  expenses: Array<Expense>;
};

const renderExpenseItem = ({ item }: { item: Expense }) => {
  return <ExpenseItem {...item} />;
};

const ExpensesList = ({ expenses }: Props) => {
  return (
    <FlatList
      data={expenses}
      renderItem={renderExpenseItem}
      keyExtractor={(item) => item.id}
    />
  );
};

export default ExpensesList;

const styles = StyleSheet.create({});
