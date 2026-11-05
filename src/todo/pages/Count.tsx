import { useState } from "react"

function Count() {
    const [count, setCount] = useState<number>(0)
  return(
    <>
     <h2>{`count:${count}`}</h2>
      <button onClick={() => setCount(count + 1)}>+</button>
      <button onClick={() => setCount(count - 1)}>-</button>
      <button onClick={() => setCount(0)}>Reset</button>

    </>
  )
}

export default Count;