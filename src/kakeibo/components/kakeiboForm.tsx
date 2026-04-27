import { useEffect, useState } from "react";
import type { CategoryState } from "./kakeibotype";
import { validate } from "../utils/utils";
import type {
  CategoryValue,
  ExpenseItem,
  ExpenseFormItem,
  result
} from "../components/kakeibotype";
import ErrorMessage from "./ErrorMessage";

type kakeiboFormProps = {
  handleEditingCancel: () => void;
  editingMode: boolean;
  saveExpense: (nextExpense: ExpenseFormItem) => void;
  editingExpense: ExpenseItem | null | undefined;
};

const KakeiboForm = ({
  handleEditingCancel,
  saveExpense,
  editingMode,
  editingExpense,
}: kakeiboFormProps) => {
  const [title, setTitle] = useState<string>("");
  const [day, setDay] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [category, setCategory] = useState<CategoryState>("");
  const [error, setError] = useState<string[]>([]);

  const sanitizeAmount = (amount: string) => {
    let num = Number(amount);
    if (num < 0) num = 0;
    setAmount(amount);
  };

  const resetForm = () => {
    setDay("");
    setTitle("");
    setAmount("");
    setCategory("");
  };

 

  const createExpense = ():result => {
    const errors = validate({ day, title, amount, category });
    if (errors.length > 0) {
      return {errors:[...errors]};
    }

    const newExpense = {
      title: title,
      day: day,
      amount: Number(amount),
      category: category as CategoryValue,
    };

    return {data:newExpense};
  };

  const sendExpense = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const nextExpense = createExpense();
    if ("errors" in nextExpense) {
      setError(nextExpense.errors);
      return;
    }    
    saveExpense(nextExpense.data);
    setError([]);
  };

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
    <>
      <form onSubmit={sendExpense} className="{kakeiboForm}">
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
            onChange={(e) => sanitizeAmount(e.target.value)}
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
          <button
            type="button"
            onClick={() => {
              handleEditingCancel();
              resetForm();
            }}
            className="cancelButton"
          >
            キャンセル
          </button>
        )}
      </form>

      {error.length > 0 &&
        error.map((item, index) => <ErrorMessage key={index} item={item} />)}
    </>
  );
};

export default KakeiboForm;
