import type { ExpenseFormItem, ExpenseItem } from "./kakeibotype";
import KakeiboFormField from "./KakeiboFormField";
import { useKakeiboForm } from "../hooks/useKakeiboForm";

type EditModalProps = {
  handleEditingCancel: () => void;
  saveExpense: (nextExpense: ExpenseFormItem) => void;
  editingExpense: ExpenseItem | null;
};

const EditModal = ({
  handleEditingCancel,
  saveExpense,
  editingExpense,
}: EditModalProps) => {
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
  } = useKakeiboForm(editingExpense);

  return (
    <div className="kakeiboModal">
      <div className="kakeiboInner">
        <KakeiboFormField
          key={editingExpense?.ID}
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

        {editingExpense !== null && (
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
