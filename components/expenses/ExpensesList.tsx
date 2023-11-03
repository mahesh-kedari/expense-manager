/**
 *
 */
import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";

type Props = {
  expenses: Array<any>;
};

const ExpensesList = ({ expenses }: Props) => {
  return (
    <FlatList
      data={expenses}
      renderItem={({ item }) => <Text>{item.title}</Text>}
    />
  );
};

export default ExpensesList;

const styles = StyleSheet.create({});
