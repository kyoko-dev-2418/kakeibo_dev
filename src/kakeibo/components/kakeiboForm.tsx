import type {  ExpenseFormItem } from "../components/kakeibotype";
import KakeiboFormField from "./kakeiboFormField";
import { useKakeiboForm } from "../hooks/useKakeiboForm";

type kakeiboFormProps = {
  saveExpense: (nextExpense: ExpenseFormItem) => void;
};

const KakeiboForm = ({
  saveExpense,
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
      resetForm={resetForm}
    />
  );
};

export default KakeiboForm;
