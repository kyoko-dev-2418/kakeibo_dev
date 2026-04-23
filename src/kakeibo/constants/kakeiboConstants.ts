import type {
  categoryLabelsType
} from "../components/kakeibotype";

export const selectCategoryLabels = [
  "all",
  "食費",
  "交通費",
  "教養",
  "娯楽",
  "その他",
] as const;


export const categoryLabels: categoryLabelsType = {
  foodExpenses: "食費",
  transportationExpenses: "交通費",
  education: "教養",
  entertainment: "娯楽",
  other: "その他",
};