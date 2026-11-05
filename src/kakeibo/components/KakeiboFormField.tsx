import type { CategoryState } from "./kakeibotype";
import { validate } from "../utils/utils";
import type { CategoryValue, ExpenseFormItem, result } from "./kakeibotype";
import ErrorMessage from "./ErrorMessage";

type kakeiboFormProps = {
  saveExpense: (nextExpense: ExpenseFormItem) => void;
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  day: string;
  setDay: React.Dispatch<React.SetStateAction<string>>;
  amount: string;
  setAmount: React.Dispatch<React.SetStateAction<string>>;
  category: CategoryState;
  setCategory: React.Dispatch<React.SetStateAction<CategoryState>>;
  error: string[];
  setError: React.Dispatch<React.SetStateAction<string[]>>;
  resetForm: () => void;
  setEditing?:()=>void;
};

const KakeiboFormField = ({
  saveExpense,
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
}: kakeiboFormProps) => {
  const sanitizeAmount = (amount: string) => {
    if (Number(amount) < 0) amount = "0";
    setAmount(amount);
  };

  const createExpense = (): result => {
    const errors = validate({ day, title, amount, category });
    if (errors.length > 0) {
      return { errors: [...errors] };
    }

    const newExpense = {
      title: title,
      day: day,
      amount: Number(amount),
      category: category as CategoryValue,
    };

    return { data: newExpense };
  };

  const sendExpense = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const nextExpense = createExpense();
    if ("errors" in nextExpense) {
      setError(nextExpense.errors);
      resetForm();
      return;
    }
    saveExpense(nextExpense.data);
    resetForm();
    setError([]);
  };

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
      </form>

      {error.length > 0 &&
        error.map((item, index) => <ErrorMessage key={index} item={item} />)}
    </>
  );
};

export default KakeiboFormField;
