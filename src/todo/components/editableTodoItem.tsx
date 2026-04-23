import type { Input } from "./types";



type EditableTodoProps = {
  input: Input;
  setInputList: React.Dispatch<React.SetStateAction<Input[]>>;
  setEditId: React.Dispatch<React.SetStateAction<number | null>>
  editInputValue: string;
  setEditInputValue: React.Dispatch<React.SetStateAction<string>>;
}





const EditableTodoItem = ({
  input,
  setInputList,
  setEditId,
  editInputValue,
  setEditInputValue }: EditableTodoProps) => {

  const handleSaveEdit = (id: number): void => {
    if(editInputValue.trim()===""){
      alert("リストを入力してください")
      return
    };
    setInputList(prev => prev.map((input) => {
      return (
        input.id === id ? { ...input, text: editInputValue } : input
      )
    })
    )

    setEditId(null);
  }

  const handleCancelEdit = ():void => {
    setEditId(null)
  }



  return (

    <form onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      handleSaveEdit(input.id)
    }}>
      <input
        type="text"
        value={editInputValue}
        onChange={e => setEditInputValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Escape') {
            e.preventDefault();
            e.stopPropagation();
            setEditInputValue("");
            setEditId(null)
          }

        }
        }
      />
      <input type="submit" value="保存" />
      <input type="button" onClick={handleCancelEdit} value="中止" />
    </form>
  )



}

export default EditableTodoItem