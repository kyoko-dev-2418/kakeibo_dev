import type { ExpenseItem, ExpenseFormItem } from "../components/kakeibotype";
import KakeiboFormField from "./kakeiboFormField";
import { useKakeiboForm } from "../hooks/useKakeiboForm";
import { useEffect } from "react";

type kakeiboFormProps = {
  saveExpense: (nextExpense: ExpenseFormItem) => void;
  editingExpense: ExpenseItem | null | undefined;
};

const KakeiboForm = ({
  saveExpense,
  editingExpense,
}: kakeiboFormProps) => {
  const {
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
  } = useKakeiboForm();

  useEffect(() => {
    if (editingExpense) {
      setDay(editingExpense.day);
      setTitle(editingExpense.title);
      setAmount(editingExpense.amount.toString());
      setCategory(editingExpense.category);
    } else {
      resetForm();
      return;
    }
  }, [editingExpense]);

  return (
    <KakeiboFormField
      title={title}
      setTitle={setTitle}
      day={day}
      setDay={setDay}
      amount={amount}
      setAmount={setAmount}
      category={category}
      setCategory={setCategory}
      error={error}
      setError={setError}
      saveExpense={saveExpense}
    />
  );
};

export default KakeiboForm;
