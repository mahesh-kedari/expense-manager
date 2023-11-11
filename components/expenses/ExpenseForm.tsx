/**
 *
 */
import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import Input from "./Input";
import Button from "../UI/Button";

type Props = {
  expense: Expense;
  onCancel: () => void;
  onSubmit: (expense: Expense) => void;
  submitButtonLabel: string;
};

interface ExpenseInput {
  id: string;
  description: string;
  amount: string;
  date: string;
}

const ExpenseForm = ({
  expense,
  onSubmit,
  onCancel,
  submitButtonLabel,
}: Props) => {
  const [inputValues, setInputValues] = useState<ExpenseInput>({
    id: expense.id,
    description: expense.description,
    amount: expense.amount.toString(),
    date: expense.date.toISOString().slice(0, 10),
  });

  const inputHandler = (inputName: string, value: string) => {
    setInputValues((prevState) => {
      return {
        ...prevState,
        [inputName]: value,
      };
    });
  };

  const handleSubmit = () => {
    const expenseData = {
      description: inputValues.description,
      amount: +inputValues.amount,
      date: new Date(inputValues.date),
      id: inputValues.id,
    };
    console.log("Submit", expenseData);
    onSubmit(expenseData);
  };
  return (
    <>
      <View style={styles.form}>
        <Text style={styles.title}>Your Expense</Text>
        <View style={styles.inputsRow}>
          <Input
            label="Amount"
            name="amount"
            keyboardType="decimal-pad"
            onValueChange={inputHandler}
            style={styles.rowInput}
            value={inputValues.amount.toString()}
          />
          <Input
            name="date"
            label="Date"
            onValueChange={inputHandler}
            placeholder="YYYY-MM-DD"
            maxLength={10}
            style={styles.rowInput}
            value={inputValues.date.toString()}
          />
        </View>
        <Input
          name="description"
          label="Description"
          keyboardType="default"
          onValueChange={inputHandler}
          value={inputValues.description}
          multiline
          autoCorrect
        />
      </View>
      <View style={styles.buttons}>
        <Button mode="flat" onPress={onCancel} style={styles.button}>
          Cancel
        </Button>
        <Button onPress={handleSubmit} style={styles.button}>
          {submitButtonLabel}
        </Button>
      </View>
    </>
  );
};

export default ExpenseForm;

const styles = StyleSheet.create({
  form: {
    marginTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginVertical: 24,
    textAlign: "center",
  },
  inputsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rowInput: {
    flex: 1,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
  pressed: {
    opacity: 0.75,
  },
});
