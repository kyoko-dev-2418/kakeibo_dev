import type {
  ExpenseItem,
  ExpenseDisplayItem,
  selectedCategoryType,
  validateProps
} from "../components/kakeibotype";
import { categoryLabels } from "../constants/kakeiboConstants";


export const formatDate = (expenseDay: string) => {
  const date = new Date(expenseDay);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return `${year}/${month}/${day}`;
};

export const getExpenseFromStorage = (): ExpenseItem[] => {
  try {
    const raw = localStorage.getItem("kakeibo");

    if (!raw) return [];
    const data = JSON.parse(raw);
    if (Array.isArray(data)) {
      return data;
    } else {
      return [];
    }
  } catch {
    return [];
  }
};


export const validate = ({ day, title, amount, category }: validateProps) => {
  const newError: string[] = [];
  if (day === "") {
    newError.push("日付を選択してください");
  }
  if (title.trim() === "") {
    newError.push("タイトルを入力してください。");
  }
  if (amount === "") {
    newError.push("金額を入力してください。");
  }
  if (category === "") {
    newError.push("カテゴリを選択してください。");
  }
  return newError;
};

export const transformExpenses = (
  list: ExpenseItem[],
): ExpenseDisplayItem[] => {
  const newList = list.map((expense) => {
    const jaCategory = categoryLabels[expense.category];
    const newExpenseList = {
      ...expense,
      day: formatDate(expense.day),
      category: jaCategory,
    };
    return newExpenseList;
  });
  return newList;
};

export const filteredExpenses = (
  expenseDisplayList: ExpenseDisplayItem[],
  selectedCategory: selectedCategoryType,
) => {
  const newList = expenseDisplayList.filter(
    (item) => selectedCategory === "all" || selectedCategory === item.category,
  );

  return newList;
};
