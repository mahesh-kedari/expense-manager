/**
 *
 */
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from "react-native";
import React from "react";
import { GlobalStyles } from "../../constants/styles";

interface Props extends TextInputProps {
  label: string;
  name: string;
  onValueChange: (inputName: string, value: string) => void;
  style?: any;
}

const Input = ({ label, style, name, onValueChange, ...otherProps }: Props) => {
  const inputHandler = (value: string) => {
    onValueChange(name, value);
  };
  return (
    <View style={[styles.inputContainer, style]}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[styles.input, otherProps.multiline && styles.inputMultiline]}
        onChangeText={inputHandler}
        {...otherProps}
      />
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  inputContainer: {
    marginVertical: 8,
    marginHorizontal: 4,
  },
  input: {
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    backgroundColor: GlobalStyles.colors.primary100,
    color: GlobalStyles.colors.primary700,
    padding: 6,
    borderRadius: 6,
    fontSize: 18,
  },
  label: {
    fontSize: 12,
    color: GlobalStyles.colors.primary100,
    marginBottom: 4,
  },
  inputMultiline: {
    minHeight: 100,
    textAlignVertical: "top",
  },
});
