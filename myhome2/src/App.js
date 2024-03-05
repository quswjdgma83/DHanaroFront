import './App.css';
import { Routes, Route } from 'react-router-dom';
import Layout1 from './component/layout1';
import Home from './component/home';
import BoardList from './component/board/board_list';
import BoardWrite from './component/board/board_write';
import BoardView from './component/board/board_view';

function App() {
  return (
    <div>
      <Routes>
        {/* 전체를 감싸는 Route가 있어야 하고, 태그 내에 문서 전체의 레이아웃 잡는 컴포넌트가 있어야 한다. */}
        <Route path='' element={<Layout1/>}>
          <Route index element={<Home/>}/>
          <Route path='board/list' element={<BoardList/>}/>
          <Route path='board/view/:id' element={<BoardView/>}/>
          <Route path='board/write' element={<BoardWrite/>}/>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
