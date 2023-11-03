import { StyleSheet, Text, View } from "react-native";
import React, { useLayoutEffect } from "react";
import {
  NavigationContainerProps,
  StackNavigationState,
} from "@react-navigation/native";

const ManageExpenses = ({ route, navigation }: any) => {
  const expense = route.params.expense;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: expense.description,
    });
  }, [navigation]);
  return (
    <View>
      <Text>ManageExpenses</Text>
    </View>
  );
};

export default ManageExpenses;

const styles = StyleSheet.create({});
