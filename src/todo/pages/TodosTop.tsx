import { useEffect, useState } from "react";
import type { Input,Filter } from "../components/types";
import AddItemForm from "../components/FormAddItem";
import TodoList from "../components/ListTodo";



function Todos() {
  const [inputValue, setInputValue] = useState<string>("");
  const [inputList, setInputList] = useState<Input[]>(() => {
    const todos = localStorage.getItem("todos");
    return todos ? JSON.parse(todos) : []
  });
  const [inputFilter, setInputFilter] = useState<Filter>("all");
  const [editId, setEditId] = useState<number | null>(null);
  const [editInputValue, setEditInputValue] = useState<string>("");




  const remainingCount = inputList.filter((i) => {
    return !i.isChecked
  }).length;

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(inputList))
  }, [inputList])





  return (
    <>
    <h2>Todoリスト</h2>

      <AddItemForm
        inputValue={inputValue}
        setInputValue={setInputValue}
        inputList={inputList}
        setInputList={setInputList}
      />


      <h2>{`リスト ${inputList.length} 個中、${remainingCount} 個残っています`}</h2>


      <div>
        <button onClick={() => setInputFilter("all")}>all</button>
        <button onClick={() => setInputFilter("active")}>active</button>
        <button onClick={() => setInputFilter("completed")}>completed</button>
        <button onClick={() => setInputFilter("sort")}>sort</button>
      </div>


      <TodoList
        inputList={inputList}
        setInputList={setInputList}
        inputFilter={inputFilter}
        editId={editId}
        setEditId={setEditId}
        // inputValue={inputValue}
        // setInputValue={setInputValue}
        editInputValue={editInputValue}
        setEditInputValue={setEditInputValue}
      />




    </>
  )
}


export default Todos;