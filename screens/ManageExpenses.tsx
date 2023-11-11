import { StyleSheet, Text, View } from "react-native";
import React, { useContext, useLayoutEffect } from "react";
import {
  NavigationContainerProps,
  StackNavigationState,
} from "@react-navigation/native";
import IconButton from "../components/UI/IconButton";
import { GlobalStyles } from "../constants/styles";
import Button from "../components/UI/Button";
import { ExpenseContext } from "../store/expense-context";
import ExpenseForm from "../components/expenses/ExpenseForm";

const ManageExpenses = ({ route, navigation }: any) => {
  const expense: Expense = route.params.expense;
  const expenseCtx = useContext(ExpenseContext);
  const expenseId = expense.id;
  const isEditing = !!expenseId;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense",
    });
  }, [navigation, isEditing]);

  const deleteExpenseHandler = () => {
    expenseCtx.deleteExpense(expense.id);
    navigation.goBack();
  };
  const cancelHandler = () => {
    navigation.goBack();
  };

  const onConfirm = (updatedExpense: Expense) => {
    if (isEditing) {
      expenseCtx.updateExpense(updatedExpense);
    } else {
      const { id, description, amount, date } = updatedExpense;
      expenseCtx.addExpense({ description, amount, date });
    }

    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <ExpenseForm
        expense={
          isEditing
            ? expense
            : {
                id: Math.random().toString(),
                amount: 0,
                date: new Date(),
                description: "",
              }
        }
        onSubmit={onConfirm}
        onCancel={cancelHandler}
        submitButtonLabel={isEditing ? "Update" : "Add"}
      />

      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon="trash"
            color={GlobalStyles.colors.error500}
            size={24}
            onPress={deleteExpenseHandler}
          />
        </View>
      )}
    </View>
  );
};

export default ManageExpenses;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: "center",
  },
});
