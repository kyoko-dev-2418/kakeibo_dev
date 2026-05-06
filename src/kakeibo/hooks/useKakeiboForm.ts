import { useState } from "react";
import type { CategoryState } from "../components/kakeibotype";

export const useKakeiboForm = () => {
  const [title, setTitle] = useState<string>("");
  const [day, setDay] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [category, setCategory] = useState<CategoryState>("");
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
