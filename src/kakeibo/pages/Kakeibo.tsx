import { useState } from "react";
import "./kakeibo.css";
import type {
  ExpenseFormItem,
  ExpenseItem,
  selectedCategoryType,
} from "../components/kakeibotype";
import KakeiboForm from "../components/kakeiboForm";
import ExpenseInputList from "../components/ExpenseInputList";
import EditModal from "../components/EditModal";
import {
  transformExpenses,
  filteredExpenses,
  getExpenseFromStorage,
} from "../utils/utils";
import { selectCategoryLabels } from "../constants/kakeiboConstants";

const Kakeibo = () => {
  const [selectedCategory, setSelectedCategory] =
    useState<selectedCategoryType>("all");
  const [editingExpense, setEditingExpense] = useState<ExpenseItem | null>(
    null,
  );
  const [expenseList, setExpenseList] = useState<ExpenseItem[]>(() =>
    getExpenseFromStorage(),
  );

  const saveExpense = (FormatExpense: ExpenseFormItem) => {
    const nextExpenseList = editingExpense
      ? expenseList.map((item) => {
          return editingExpense.ID === item.ID
            ? { ...FormatExpense, ID: editingExpense.ID }
            : item;
        })
      : [...expenseList, { ...FormatExpense, ID: Date.now() }];

    setExpenseList(nextExpenseList);
    setEditingExpense(null);
    localStorage.setItem("kakeibo", JSON.stringify(nextExpenseList));
  };

  const expenseDisplayList = transformExpenses(expenseList);
  const filterList = filteredExpenses(expenseDisplayList, selectedCategory);

  const handleEditing = (ID: number) => {
    const editItem = expenseList.find((expense) => expense.ID === ID);
    if (editItem) {
      setEditingExpense(editItem);
    }
  };

  const handleEditingCancel = () => {
    setEditingExpense(null);
  };

  const handleDeleteItem = (id: number) => {
    const newItem = expenseList.filter((item) => item.ID !== id);
    localStorage.setItem("kakeibo", JSON.stringify(newItem));
    return setExpenseList(newItem);
  };

  return (
    <div className="expensePage">
      <h2>家計簿</h2>
      {editingExpense === null ? (
        <KakeiboForm saveExpense={saveExpense} />
      ) : (
        <div style={{ height: "200px" }}></div>
      )}

      {selectCategoryLabels.length > 0 &&
        selectCategoryLabels.map((label) => (
          <button key={label} onClick={() => setSelectedCategory(label)}>
            {label}
          </button>
        ))}

      {filterList.length > 0 ? (
        filterList.map((item) => (
          <ExpenseInputList
            key={item.ID}
            item={item}
            handleEditing={handleEditing}
            handleDeleteItem={handleDeleteItem}
          />
        ))
      ) : (
        <p style={{ fontSize: "18px", marginTop: "8px" }}>
          保存項目はありません
        </p>
      )}

      {editingExpense !== null && (
        <EditModal
          key={editingExpense?.ID}
          handleEditingCancel={handleEditingCancel}
          editingExpense={editingExpense}
          saveExpense={saveExpense}
        />
      )}
    </div>
  );
};

export default Kakeibo;
