import logo from "./logo.svg";
import "./App.css";
import { Route, Routes } from "react-router";
import Layout1 from "./component/layout1";
import Home from "./component/home";
import BoardList from "./component/board/board_list";
import BoardView from "./component/board/board_view";
import BoardWrite from "./component/board/board_write";

function App() {
  return (
    <div>
      {/*라우트를 만들자  url -> 컴포넌트를 연결하자 */}
      <Routes>
        {/* 전체를 감싸는 Route 여기에 문서전체의
          레이아웃을 잡는 컴포넌트가 있어야한다
          path -기본 url이되고 element 는 저 url 선택했을때 나올 컴포넌트
          */}
        <Route path="/" element={<Layout1 />}>
          {/* / 를 따라갈 라우터들  index는 위의 부모 path그대로 */}
          <Route index element={<Home />} />
          <Route path="board/list" element={<BoardList />} />
          <Route path="board/view/:id" element={<BoardView />} />
          <Route path="board/write" element={<BoardWrite />} />
        </Route>
      </Routes>
    </div>
  );
}
export default App;
