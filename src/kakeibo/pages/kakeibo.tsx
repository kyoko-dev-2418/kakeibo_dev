import { useEffect, useState } from "react";
import "./kakeibo.css";
import type {
  CategoryValue,
  CategoryState,
  ExpenseItem,
  selectedCategoryType,
} from "../components/kakeibotype";
import KakeiboForm from "../components/kakeiboForm";
import ExpenseInputList from "../components/ExpenseInputList";
import EditModal from "../components/editModal";
import ErrorMessage from "../components/ErrorMessage";
import {
 transformExpenses,
  filteredExpenses,
  getExpenseFromStorage,
  validate,
} from "../utils/utils";
import { selectCategoryLabels } from "../constants/kakeiboConstants";

const Kakeibo = () => {
  const [title, setTitle] = useState<string>("");
  const [day, setDay] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [category, setCategory] = useState<CategoryState>("");
  const [error, setError] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] =
    useState<selectedCategoryType>("all");
  const [editingExpense, setEditingExpense] = useState<
    ExpenseItem | null | undefined
  >(null);
  const [editingMode, setEditingMode] = useState<boolean>(false);
  const [expenseList, setExpenseList] = useState<ExpenseItem[]>(() =>
    getExpenseFromStorage(),
  );

  const validateAmount = (amount: string) => {
    let num = Number(amount);
    if (num < 0) num = 0;
    setAmount(amount);
  };

  const handleSaveExpense = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newError = validate({ day, title, amount, category });
    if (newError.length > 0) {
      setError(newError);
      return;
    }

    const parsedAmount = Number(amount);
    if (isNaN(parsedAmount)) return;

    const nextExpenseList =
      editingMode && editingExpense
        ? expenseList.map((item) => {
            return item.ID === editingExpense.ID
              ? {
                  ...item,
                  title: title,
                  day: day,
                  amount: parsedAmount,
                  category: category as CategoryValue,
                }
              : item;
          })
        : [
            ...expenseList,
            {
              ID: Date.now(),
              title: title,
              day: day,
              amount: parsedAmount,
              category: category as CategoryValue,
            },
          ];
    setExpenseList(nextExpenseList);
    setEditingMode(false);
    localStorage.setItem("kakeibo", JSON.stringify(nextExpenseList));

    setTitle("");
    setDay("");
    setAmount("");
    setCategory("");
    setError([]);
  };

  const expenseDisplayList =transformExpenses(expenseList);
  const filterList = filteredExpenses(expenseDisplayList, selectedCategory);

  const handleEditing = (ID: number) => {
    const editItem = expenseList.find((expense) => expense.ID === ID);
    setEditingMode(true);
    setEditingExpense(editItem);
  };

  const handleEditingCancel = () => {
    setEditingMode(false);
    setEditingExpense(null);
    setDay("");
    setTitle("");
    setAmount("");
    setCategory("");
  };

  useEffect(() => {
    if (!editingExpense) return;

    setDay(editingExpense.day);
    setTitle(editingExpense.title);
    setAmount(editingExpense.amount.toString());
    setCategory(editingExpense.category);
  }, [editingExpense]);

  return (
    <div className="expensePage">
      <h2>家計簿</h2>

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

      {error.length > 0 && error.map((item) => <ErrorMessage item={item} />)}

      {selectCategoryLabels.length > 0 &&
        selectCategoryLabels.map((label) => (
          <button key={label} onClick={() => setSelectedCategory(label)}>
            {label}
          </button>
        ))}

      {filterList.length > 0 ? (
        filterList.map((item) => (
          <ExpenseInputList
            key={item.title}
            item={item}
            handleEditing={() => handleEditing(item.ID)}
          />
        ))
      ) : (
        <p style={{ fontSize: "18px", marginTop: "8px" }}>
          保存項目はありません
        </p>
      )}

      {editingMode && (
        <EditModal
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
      )}
    </div>
  );
};

export default Kakeibo;
