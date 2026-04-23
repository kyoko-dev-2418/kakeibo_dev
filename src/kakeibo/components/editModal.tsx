import KakeiboForm from "./kakeiboForm";
import type { CategoryState } from "./kakeibotype";

type kakeiboFormProps = {
  handleSaveExpense: (e: React.FormEvent<HTMLFormElement>) => void;
  validateAmount: (amount: string) => void;
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  day: string;
  setDay: React.Dispatch<React.SetStateAction<string>>;
  amount: string;
  category: CategoryState;
  setCategory: React.Dispatch<React.SetStateAction<CategoryState>>;
  handleEditingCancel: () => void;
  editingMode: boolean;
};

const EditModal = ({
  handleSaveExpense,
  validateAmount,
  title,
  setTitle,
  day,
  setDay,
  amount,
  category,
  setCategory,
  handleEditingCancel,
  editingMode,
}: kakeiboFormProps) => {
  return (
    <div className="kakeiboModal">
      <div className="kakeiboInner">
        <KakeiboForm
          handleSaveExpense={handleSaveExpense}
          validateAmount={validateAmount}
          title={title}
          setTitle={setTitle}
          day={day}
          setDay={setDay}
          amount={amount}
          category={category}
          setCategory={setCategory}
          handleEditingCancel={handleEditingCancel}
          editingMode={editingMode}
        />
      </div>
    </div>
  );
};

export default EditModal;
