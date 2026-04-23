import type { ExpenseDisplayItem } from "./kakeibotype";

type expenseInputListProps = {
  item: ExpenseDisplayItem;
  handleEditing:(ID:number)=>void;
};

const ExpenseInputList = ({ item,handleEditing }: expenseInputListProps) => {
  return (
    <div className="expenseListItem">
      <p className="date">{item.day}</p>
      <p className="title">{item.title}</p>
      <p className="amount">{item.amount}円</p>
      <p className="category">{item.category}</p>
      <button className="editButton" onClick={()=>handleEditing(item.ID)}>編集</button>
    </div>
  );
};
export default ExpenseInputList;
