//컨텍스트로 부터 사용자 id를 가져와서 화면에 목록을 뿌린다.
import "bootstrap/dist/css/bootstrap.min.css";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext, getStateFromLocalStorage } from "./mycontext";
import axios from "axios";

//https://jsonplaceholder.typicode.com/albums?userId=2
type ItemType = {
  id: number;
  userId: number;
  title: string;
};
//데이터를 우선 임시로 만든다
const itemData: ItemType[] = [
  { id: 1, userId: 2, title: "제목1" },
  { id: 2, userId: 2, title: "제목2" },
  { id: 3, userId: 2, title: "제목3" },
  { id: 4, userId: 2, title: "제목4" },
  { id: 5, userId: 2, title: "제목5" },
];

function AlbumList() {
  const [items, setItems] = useState<ItemType[]>([]);
  //한개만 선택
  const [selectItem, setSelectItem] = useState<ItemType>({
    id: -1,
    userId: 0,
    title: "",
  });
  //선태한 항목이 들어가야 하고 id가 -1인 이유는 데이터가 배열이다.
  //0~ 데이터 끝까지  -1값을 넣어놓으면 배열의 인덱스가 유효하지 않음

  //이따가 fetch나 axios사용할때 쓰자
  let context = useContext(AppContext);
  useEffect(() => {
    const controller = new AbortController(); //객체가 여기서 만들어져야 한다
    //************************************* */
    context.state = getStateFromLocalStorage("appState"); //로그온한 아이디가져오고 다른 정보 불러온다
    //axios 로 가져와서 콘텍스트에 저장하기
    let id = context.state.userid;
    let url = "https://jsonplaceholder.typicode.com/albums?userId=" + id;
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
  }, []);

  //항목을 클릭했을때 선택항목 저장하기
  const itemClick = (item: ItemType) => {
    setSelectItem({ ...item }); //JSON으로 저장하자
    console.log(item.id, "selected");
  };

  const navigate = useNavigate();
  const buttonClick = () => {
    navigate("/photo/list", { state: selectItem }); //state로만 넘거야 한다
  };

  return (
    <div className="container mt-3" style={{ marginTop: "50px" }}>
      <button
        type="button"
        className="button btn-primary"
        disabled={selectItem.id == -1 ? true : false}
        onClick={buttonClick}
      >
        사진보기
      </button>

      <ul className="list-group list-group-flush">
        {items.map((item: ItemType, key: number) => {
          return (
            <li
              className="list-group-item "
              style={{
                textAlign: "left",
                backgroundColor:
                  selectItem.id == item.id ? "lightgray" : "white",
              }}
              key={key}
              onClick={() => {
                itemClick(item);
              }}
            >
              {item.title}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default AlbumList;
/*
{
    "albumId": 1,
    "id": 3,
    "title": "officia porro iure quia iusto qui ipsa ut modi",
    "url": "https://via.placeholder.com/600/24f355",
    "thumbnailUrl": "https://via.placeholder.com/150/24f355"
},*/
