/**
 *
 */
import { StyleSheet, Text, View } from "react-native";
import React from "react";

type Props = {};

const ExpensesSummary = (props: Props) => {
  return (
    <View>
      <Text>Last 7 days</Text>
      <Text>$ 177.50</Text>
    </View>
  );
};

export default ExpensesSummary;

const styles = StyleSheet.create({});
