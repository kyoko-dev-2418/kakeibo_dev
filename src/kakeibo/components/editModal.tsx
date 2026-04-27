import KakeiboForm from "./kakeiboForm";
import type { ExpenseItem } from "./kakeibotype";

type kakeiboFormProps = {
  handleEditingCancel: () => void;
    editingMode: boolean;
    saveExpense: (nextExpense: ExpenseItem) => void;
    editingExpense: ExpenseItem | null | undefined;
};

const EditModal = ({
  handleEditingCancel,
  saveExpense,
  editingMode,
  editingExpense,
}: kakeiboFormProps) => {
  return (
    <div className="kakeiboModal">
      <div className="kakeiboInner">
        <KakeiboForm
          handleEditingCancel={handleEditingCancel}
        editingMode={editingMode}
        editingExpense={editingExpense}
        saveExpense={saveExpense}
        />
      </div>
    </div>
  );
};

export default EditModal;
