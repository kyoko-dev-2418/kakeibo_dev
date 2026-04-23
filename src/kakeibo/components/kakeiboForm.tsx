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

const KakeiboForm = ({
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
    <form onSubmit={handleSaveExpense} className="kakeiboForm">
      <div>
        <label htmlFor="date">日付</label>
        <input
          type="date"
          placeholder="日付"
          id="date"
          value={day}
          onChange={(e) => setDay(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="title">タイトル</label>
        <input
          type="text"
          placeholder="タイトル"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="amount">金額</label>
        <input
          type="number"
          placeholder="金額"
          id="amount"
          value={amount}
          onChange={(e) => validateAmount(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="category">カテゴリ</label>
        <select
          name="category"
          id="category"
          value={category}
          onChange={(e) =>
            setCategory(
              e.target.value as
                | "foodExpenses"
                | "transportationExpenses"
                | "education"
                | "entertainment"
                | "other"
                | "",
            )
          }
        >
          <option value="">カテゴリを選択</option>
          <option value="foodExpenses">食費</option>
          <option value="transportationExpenses">交通費</option>
          <option value="education">教養</option>
          <option value="entertainment">娯楽</option>
          <option value="other">その他</option>
        </select>
      </div>

      <button type="submit">保存</button>

      {editingMode === true && (
        <button onClick={handleEditingCancel} className="cancelButton">キャンセル</button>
      )}
    </form>
  );
};

export default KakeiboForm;
