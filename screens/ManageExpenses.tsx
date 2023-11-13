import { StyleSheet, Text, View } from "react-native";
import React, { useContext, useLayoutEffect, useState } from "react";
import {
  NavigationContainerProps,
  StackNavigationState,
} from "@react-navigation/native";
import IconButton from "../components/UI/IconButton";
import { GlobalStyles } from "../constants/styles";
import Button from "../components/UI/Button";
import { ExpenseContext } from "../store/expense-context";
import ExpenseForm from "../components/expenses/ExpenseForm";
import { deleteExpense, storeExpense, updateExpense } from "../utils/http";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import ErrorOverlay from "../components/UI/ErrorOverlay";

const ManageExpenses = ({ route, navigation }: any) => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState(null);
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
    setIsSubmitting(true);
    expenseCtx.deleteExpense(expense.id);
    deleteExpense(expense.id);
    navigation.goBack();
  };
  const cancelHandler = () => {
    navigation.goBack();
  };

  const onConfirm = async (updatedExpense: Expense) => {
    setIsSubmitting(true);
    try {
      if (isEditing) {
        expenseCtx.updateExpense(updatedExpense);
        updateExpense(updatedExpense.id, {
          description: updatedExpense.description,
          amount: updatedExpense.amount,
          date: updatedExpense.date,
        });
      } else {
        const { description, amount, date } = updatedExpense;
        const id = await storeExpense({ description, amount, date });
        expenseCtx.addExpense({ id, description, amount, date });
      }
      navigation.goBack();
    } catch (error: any) {
      setIsSubmitting(false);
      setError(error.message);
    }
  };

  const handleError = () => {
    setError(null);
  };

  if (isSubmitting) {
    return <LoadingOverlay />;
  } else if (!!error) {
    return <ErrorOverlay message={error} onConfirm={handleError} />;
  } else {
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
  }
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
