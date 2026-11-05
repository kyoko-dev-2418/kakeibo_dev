import type React from "react";
import type { Input } from "./types";
import EditableTodoItem from "./TodoItemEditable";
import { useMemo } from "react";



type todoListProps = {
  inputList: Input[];
  setInputList: React.Dispatch<React.SetStateAction<Input[]>>;
  inputFilter: ("all" | "active" | "completed" | "sort");
  editId: number | null;
  setEditId: React.Dispatch<React.SetStateAction<number | null>>
  editInputValue: string;
  setEditInputValue: React.Dispatch<React.SetStateAction<string>>;
  // inputValue: string;
  // setInputValue: React.Dispatch<React.SetStateAction<string>>;
}

const TodoList =
  ({ inputList,
    setInputList,
    inputFilter,
    editId,
    setEditId,
    editInputValue,
    setEditInputValue }: todoListProps) => {



    const deleteInputItem = (id: number): void => {

      setInputList((prev) => prev.filter((input) => {
        return input.id !== id;
      })
      );
    }

    const toggleCheck = (id: number): void => {

      setInputList(prev => prev.map((input) => {
        return (
          input.id === id ? { ...input, isChecked: !input.isChecked } : input
        )
      }));
    }

    const visibleTodos = useMemo(() => {
      if (inputFilter === "sort") {
        const sorted = [...inputList].sort((a, b) => {
          return Number(a.isChecked) - Number(b.isChecked)
        });
        return sorted;
      }

      // if (inputFilter === "all" || inputFilter === "active" || inputFilter === "completed") {
        return inputList.filter((i) => {
          if (inputFilter === "active") {
            return i.isChecked === false
          }
          if (inputFilter === "completed") {
            return i.isChecked === true
          }

          return true
        });

      // }




    }, [inputFilter, inputList])

    return (
      <>
        {
          inputList.length > 0 && (
            // inputList.filter((i) => {
            //   if (inputFilter === "active") {
            //     return i.isChecked === false
            //   }
            //   if (inputFilter === "completed") {
            //     return i.isChecked === true
            //   }
            //   return true
            // }).map((input) => {
            //   if (editId !== null && editId === input.id) {

            //     return (
            //       <EditableTodoItem
            //         key={input.id}
            //         input={input}
            //         setInputList={setInputList}
            //         setEditId={setEditId}
            //         editInputValue={editInputValue}
            //         setEditInputValue={setEditInputValue}
            //       />

            //     )


            //   }
            visibleTodos.map((input) => {
              if (editId !== null && editId === input.id) {

                return (
                  <EditableTodoItem
                    key={input.id}
                    input={input}
                    setInputList={setInputList}
                    setEditId={setEditId}
                    editInputValue={editInputValue}
                    setEditInputValue={setEditInputValue}
                  />

                )


              }
              return (
                <div key={input.id} className='todo_list'>
                  <input
                    type="checkbox"
                    checked={input.isChecked}
                    onChange={() => toggleCheck(input.id)} />
                  <p className={`${input.isChecked === true ? "checked" : ""}`}>{input.text}</p>
                  <div className="edit_button">
                    <button onClick={() => deleteInputItem(input.id)}>削除</button>
                    <button onClick={() => {
                      setEditId(input.id)
                      setEditInputValue(input.text)
                    }}>編集</button>
                  </div>
                </div>
              )
            })
          )
        }


      </>
    )

  }


export default TodoList