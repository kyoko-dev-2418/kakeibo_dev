export type CategoryValue =
  | "foodExpenses"
  | "transportationExpenses"
  | "education"
  | "entertainment"
  | "other";

export type CategoryState = CategoryValue | "";

export type ExpenseItem = {
  ID: number;
  day: string;
  title: string;
  amount: number;
  category: CategoryValue;
};
export type ExpenseFormItem = {
  day: string;
  title: string;
  amount: number;
  category: CategoryValue;
};

export type JapaneseCategory = "食費" | "交通費" | "教養" | "娯楽" | "その他";

export type ExpenseDisplayItem = {
  ID: number;
  day: string;
  title: string;
  amount: number;
  category: JapaneseCategory;
};

export type selectedCategoryType =
  | "all"
  | "食費"
  | "交通費"
  | "教養"
  | "娯楽"
  | "その他";

export type categoryLabelsType = Record<CategoryValue, JapaneseCategory>;

export type validateProps = {
  day: string;
  title: string;
  amount: string;
  category: CategoryState;
};

export type result = { data: ExpenseFormItem } | { errors: string[] };
