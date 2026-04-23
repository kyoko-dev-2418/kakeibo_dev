import type React from "react";
import type{Input} from "./types";


type AddItemFormProps={
  inputValue:string;
  setInputValue:React.Dispatch<React.SetStateAction<string>>;
  inputList:Input[];
  setInputList:React.Dispatch<React.SetStateAction<Input[]>>
}

const AddItemForm=({inputValue,setInputValue,inputList,setInputList}: AddItemFormProps)=>{
  const addInputItem = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputValue.trim()) {

      alert("入力してください")
      return;
    }

    if (inputList.some((input) => input.text === inputValue)) {
      alert("同じものが存在します")
      return;
    }

    const newTodo = [...inputList, { id: Date.now(), text: inputValue, isChecked: false }];
    setInputList(newTodo);
    setInputValue("");
  }


  return(
    <form onSubmit={addInputItem}>
        <input
          type="text"
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
        />
        <button type="submit">追加</button>

      </form>
  )
}
export default AddItemForm;