import type { ExpenseDisplayItem } from "./kakeibotype";

type expenseInputListProps = {
  item: ExpenseDisplayItem;
  handleEditing:(ID:number)=>void;
  handleDeleteItem:(ID:number)=>void;
};

const ExpenseInputList = ({ item,handleEditing,handleDeleteItem }: expenseInputListProps) => {
  return (
    <div className="expenseListItem">
      <p className="date">{item.day}</p>
      <p className="title">{item.title}</p>
      <p className="amount">{item.amount}円</p>
      <p className="category">{item.category}</p>
      <button className="expenseInputList-editButton" onClick={()=>handleEditing(item.ID)}>編集</button>
      <button className="expenseInputList-deleteButton" onClick={()=>handleDeleteItem(item.ID)}>削除</button>
    </div>
  );
};
export default ExpenseInputList;
