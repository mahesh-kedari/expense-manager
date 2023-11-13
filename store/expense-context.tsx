import { createContext, useReducer, PropsWithChildren } from "react";

interface ExpenseContextType {
  expenses: Expense[];
  addExpense: (expense: Expense) => void;
  setExpenses: (expenses: Array<Expense>) => void;
  deleteExpense: (id: string) => void;
  updateExpense: (expense: Expense) => void;
}

export const ExpenseContext = createContext<ExpenseContextType>({
  expenses: [],
  addExpense: (expense) => {},
  setExpenses: (expenses) => {},
  deleteExpense: (id) => {},
  updateExpense: ({ id, description, amount, date }) => {},
});

type ActionType =
  | { type: "ADD"; payload: Expense }
  | { type: "SET"; payload: Array<Expense> }
  | { type: "UPDATE"; payload: { id: string; data: Partial<Expense> } }
  | { type: "DELETE"; payload: string };

const expensesReducer = (state: Expense[], action: ActionType): Expense[] => {
  switch (action.type) {
    case "ADD":
      return [action.payload, ...state];
    case "SET":
      return action.payload;
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
  const [expenseState, dispatch] = useReducer(expensesReducer, []);
  //   const [expenseState, dispatch] = useReducer<any>(expensesReducer, []);
  const addExpense: ExpenseContextType["addExpense"] = (expense) => {
    dispatch({ type: "ADD", payload: expense });
  };

  const setExpenses: ExpenseContextType["setExpenses"] = (expenses) => {
    dispatch({ type: "SET", payload: expenses.reverse() });
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
        setExpenses,
        deleteExpense,
        updateExpense,
      }}
    >
      {children}
    </ExpenseContext.Provider>
  );
}
