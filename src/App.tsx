import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import './App.css'
import Count from './todo/pages/count';
import Todos from './todo/pages/todos';
import Kakeibo from './kakeibo/pages/KakeiboTop';


// App.jsx は今は Router と Provider を置く場所

function App() {
  return (
    <div className="App">


      <BrowserRouter>
        <div className="header">
          <Link to="/">counts</Link>  
          <Link to="/todos">Todos</Link>  
          <Link to="/kakeibo">家計簿</Link>
        </div>
        <Routes>
          <Route path='/' element={<Count />} />
          <Route path='/todos' element={<Todos />} />
          <Route path='/kakeibo' element={<Kakeibo />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
