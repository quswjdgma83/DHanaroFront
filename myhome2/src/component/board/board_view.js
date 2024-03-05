import axios from "axios";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function BoardView() {
  let { id } = useParams(); // JSON 해체
  const [board, setBoard] = useState({});

  useEffect(() => {
    let url = process.env.REACT_APP_HOST_IP + "/board/view/" + id;
    console.log(url);
    axios
      .get(url)
      .then((res) => {
        console.log(res.data);
        setBoard(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []); // 처음에 한 번 렌더링해라! 라는 의미

  return (
    <div className="container" style={{ marginTop: "20px" }}>
      <h2>게시판 상세보기</h2>

      <table className="table table-hover " style={{ marginTop: "30px" }}>
        <tbody>
          <tr className="table-secondary">
            <th>제목</th>
            <td colspan="5">{board.title}</td>
          </tr>
          <tr>
            <th>작성자</th>
            <td>{board.writer}</td>
            <th>작성일</th>
            <td>{board.date}</td>
            <th>조회수</th>
            <td>12</td>
          </tr>
          <tr>
            <th colspan="6" className="table-secondary">
              내용
            </th>
          </tr>
          <tr>
            <td colspan="6">
              {/* board.contents 가 null이 들어갈 수 있다.
				optional을 써서 이 문제를 처리, 객체 뒤에 ?를 붙인다. split(문자)이 문자를 기준으로 문자배열을 만들어 반환한다. */}
              {board.contents?.split("\n").map((line) => {
                return (
                  <span>
                    {line}
                    <br />
                  </span>
                );
              })}
            </td>
          </tr>
        </tbody>
      </table>

      <div className="container mt-3" style={{ textAlign: "right" }}>
        <Link to="/board/list" className="btn btn-secondary" />
      </div>
    </div>
  );
}

export default BoardView;
