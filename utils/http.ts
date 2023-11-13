import axios from "axios";

const BACKEND_URL =
  "https://rn-expense-manager-46329-default-rtdb.asia-southeast1.firebasedatabase.app";
export async function storeExpense(expenseData: Omit<Expense, "id">) {
  const response = await axios.post(
    BACKEND_URL + "/expenses.json",
    expenseData
  );
  const id = response.data.name;
  return id;
}

export async function fetchExpenses(): Promise<Expense[]> {
  const response = await axios.get(BACKEND_URL + "/expenses.json");
  const expenses = [];
  for (const key in response.data) {
    expenses.push({
      id: key,
      description: response.data[key].description,
      amount: response.data[key].amount,
      date: new Date(response.data[key].date),
    });
  }
  return expenses;
}

export function updateExpense(id: string, expenseData: Omit<Expense, "id">) {
  return axios.put(BACKEND_URL + "/expenses/" + id + ".json", expenseData);
}

export function deleteExpense(id: string) {
  return axios.delete(BACKEND_URL + "/expenses/" + id + ".json");
}
