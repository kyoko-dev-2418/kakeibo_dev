import { useState } from "react";
import type { CategoryState,ExpenseItem } from "../components/kakeibotype";

export const useKakeiboForm = (editingExpense?:ExpenseItem|null| undefined) => {
  const [title, setTitle] = useState<string>(editingExpense?.title||"");
  const [day, setDay] = useState<string>(editingExpense?.day||"");
  const [amount, setAmount] = useState<string>(editingExpense?.amount.toString()||"");
  const [category, setCategory] = useState<CategoryState>(editingExpense?.category||"");
  const [error, setError] = useState<string[]>([]);

  const resetForm = () => {
    setDay("");
    setTitle("");
    setAmount("");
    setCategory("");
  };

  return {
    title,
    setTitle,
    day,
    setDay,
    amount,
    setAmount,
    category,
    setCategory,
    error,
    setError,
    resetForm,
  };
};
