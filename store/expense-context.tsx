import { createContext, useReducer, PropsWithChildren } from "react";
import { DUMMY_EXPENSES } from "./dummy-expenses";

interface ExpenseContextType {
  expenses: Expense[];
  addExpense: (expense: Omit<Expense, "id">) => void;
  deleteExpense: (id: string) => void;
  updateExpense: (expense: Expense) => void;
}

export const ExpenseContext = createContext<ExpenseContextType>({
  expenses: [],
  addExpense: ({ description, amount, date }) => {},
  deleteExpense: (id) => {},
  updateExpense: ({ id, description, amount, date }) => {},
});

type ActionType =
  | { type: "ADD"; payload: Omit<Expense, "id"> }
  | { type: "UPDATE"; payload: { id: string; data: Partial<Expense> } }
  | { type: "DELETE"; payload: string };

const expensesReducer = (state: Expense[], action: ActionType): Expense[] => {
  switch (action.type) {
    case "ADD":
      return [{ id: Math.random().toString(), ...action.payload }, ...state];
    case "UPDATE":
      const updatableExpenseIndex = state.findIndex(
        (expense: Expense) => expense.id === action.payload.id
      );
      const updatableExpense = state[updatableExpenseIndex];
      const updatedItem = { ...updatableExpense, ...action.payload.data };
      const updatedExpenses = [...state];
      updatedExpenses[updatableExpenseIndex] = updatedItem;
      return updatedExpenses;
    case "DELETE":
      return state.filter((expense: Expense) => expense.id !== action.payload);
    default:
      return state;
  }
};

export function ExpenseContextProvider({
  children,
}: PropsWithChildren<any>): JSX.Element {
  const [expenseState, dispatch] = useReducer(expensesReducer, DUMMY_EXPENSES);
  //   const [expenseState, dispatch] = useReducer<any>(expensesReducer, []);
  const addExpense: ExpenseContextType["addExpense"] = ({
    description,
    amount,
    date,
  }) => {
    dispatch({ type: "ADD", payload: { description, amount, date } });
  };

  const deleteExpense: ExpenseContextType["deleteExpense"] = (id) => {
    dispatch({ type: "DELETE", payload: id });
  };

  const updateExpense: ExpenseContextType["updateExpense"] = (expense) => {
    dispatch({ type: "UPDATE", payload: { id: expense.id, data: expense } });
  };

  return (
    <ExpenseContext.Provider
      value={{
        expenses: expenseState,
        addExpense,
        deleteExpense,
        updateExpense,
      }}
    >
      {children}
    </ExpenseContext.Provider>
  );
}
