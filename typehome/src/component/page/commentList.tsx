import { useContext, useEffect, useState } from "react";
import { AppContext, getStateFromLocalStorage } from "../mycontext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

type ItemType = {
  id: number;
  postId: number;
  name: string;
  email: string;
  body: string;
};

function CommentList() {
  const [items, setItems] = useState<ItemType[]>([]);
  //한개만 선택
  const [selectItem, setSelectItem] = useState<ItemType>({
    id: -1,
    postId: 0,
    name: "",
    email: "",
    body: "",
  });

  let context = useContext(AppContext);
  useEffect(() => {
    const controller = new AbortController(); //객체가 여기서 만들어져야 한다
    //************************************* */
    context.state = getStateFromLocalStorage("appState"); //로그온한 아이디가져오고 다른 정보 불러온다
    //axios 로 가져와서 콘텍스트에 저장하기
    let id = context.state.userid;
    let url = "https://jsonplaceholder.typicode.com/comments?postId=" + id;
    console.log(url);
    axios
      .get(url, { signal: controller.signal })
      .then((res) => {
        console.log(res.data[0]);
        setItems(res.data);
      })
      .catch((error) => {
        console.log(error);
      });

    return () => {
      console.log("마지막 정리작업을 하고 나간다 ");
      controller.abort(); //메모리 누스 해제, 백그라운드에서 작동중인
      //axios등을 멈추게 할 수 있다
    };
    //setItems([...itemData]);//axios로 데이터 가져와서 출력하기
  }, [context]);

  const navigate = useNavigate();

  //항목을 클릭했을때 선택항목 저장하기
  const itemClick = (item: ItemType) => {
    setSelectItem({ ...item }); //JSON으로 저장하자
    console.log(item.id, "selected");
  };

  const buttonClick = () => {
    navigate("/comment/detail", { state: selectItem }); //state로만 넘거야 한다
  };
  return (
    <div className="container mt-3" style={{ marginTop: "50px" }}>
      <button
        type="button"
        className="button btn-primary"
        disabled={selectItem.id === -1 ? true : false}
        onClick={buttonClick}
      >
        내 작성글 보기
      </button>
      <button
        type="button"
        className="button btn-primary"
        onClick={() => navigate("/posts/list")}
      >
        뒤로가기
      </button>

      <ul className="list-group list-group-flush">
        {items.map((item: ItemType, key: number) => {
          return (
            <li
              className="list-group-item "
              style={{
                textAlign: "left",
                backgroundColor:
                  selectItem.id === item.id ? "lightgray" : "white",
              }}
              key={key}
              onClick={() => {
                itemClick(item);
              }}
            >
              {item.name}
              {item.email}
              {item.body}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default CommentList;
