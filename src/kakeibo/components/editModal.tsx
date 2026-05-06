import type { ExpenseFormItem, ExpenseItem } from "./kakeibotype";
import KakeiboFormField from "./kakeiboFormField";
import { useKakeiboForm } from "../hooks/useKakeiboForm";
import { useEffect } from "react";

type kakeiboFormProps = {
  handleEditingCancel: () => void;
  editingMode: boolean;
  saveExpense: (nextExpense: ExpenseFormItem) => void;
  editingExpense: ExpenseItem | null | undefined;
};

const EditModal = ({
  handleEditingCancel,
  saveExpense,
  editingMode,
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
    resetForm
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
    <div className="kakeiboModal">
      <div className="kakeiboInner">
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

        {editingMode === true && (
          <button
            type="button"
            onClick={() => {
              handleEditingCancel();
            }}
            className="cancelButton"
          >
            キャンセル
          </button>
        )}
      </div>
    </div>
  );
};

export default EditModal;
