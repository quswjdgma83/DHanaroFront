import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function BoardList() {
  const [boardList, setBoardList] = useState([]);
  const [loading, setLoading] = useState(false);
  const hosturl = process.env.REACT_APP_HOST_IP;

  let loadData = async () => {
    let url = hosturl + "/board/list";
    let result = await axios.get(url);
    console.log(result.data);
    setBoardList(result.data);
    setLoading(true);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="container" style={{ marginTop: "20px" }}>
      <h2>게시판 목록</h2>

      <div className="input-group mb-3" style={{ marginTop: "20px" }}>
        <button
          type="button"
          className="btn btn-primary dropdown-toggle"
          data-bs-toggle="dropdown"
        >
          선택하세요
        </button>
        <ul className="dropdown-menu">
          <li>
            <a className="dropdown-item" href="#">
              제목
            </a>
          </li>
          <li>
            <a className="dropdown-item" href="#">
              내용
            </a>
          </li>
          <li>
            <a className="dropdown-item" href="#">
              제목+내용
            </a>
          </li>
        </ul>
        <input type="text" className="form-control" placeholder="Search" />
        <button className="btn btn-secondary" type="submit">
          Go
        </button>
      </div>

      <table className="table table-hover ">
        <colgroup>
          <col width="8%"></col>
          <col width="*"></col>
          <col width="12%"></col>
          <col width="12%"></col>
        </colgroup>
        <thead className="table-secondary">
          <tr>
            <th>번호</th>
            <th>제목</th>
            <th>작성자</th>
            <th>작성일</th>
          </tr>
        </thead>
        <tbody>
          {loading == true ? (
            boardList.map((boardItem, key) => {
              return (
                <tr key={key}>
                  <td>{boardItem.id}</td>
                  <td>
                    <Link to={"/board/view/" + boardItem.id}>
                      {boardItem.title}
                    </Link>
                  </td>
                  <td>{boardItem.writer}</td>
                  <td>{boardItem.wdate}</td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan="4">데이터가 없습니다!</td>
            </tr>
          )}
        </tbody>
      </table>

      <ul className="pagination  justify-content-center">
        <li className="page-item disabled">
          <a className="page-link" href="#">
            first
          </a>
        </li>
        <li className="page-item disabled">
          <a className="page-link" href="#">
            Previous
          </a>
        </li>
        <li className="page-item">
          <a className="page-link" href="#">
            1
          </a>
        </li>
        <li className="page-item">
          <a className="page-link" href="#">
            2
          </a>
        </li>
        <li className="page-item">
          <a className="page-link" href="#">
            3
          </a>
        </li>
        <li className="page-item">
          <a className="page-link" href="#">
            4
          </a>
        </li>
        <li className="page-item">
          <a className="page-link" href="#">
            5
          </a>
        </li>
        <li className="page-item">
          <a className="page-link" href="#">
            Next
          </a>
        </li>
        <li className="page-item">
          <a className="page-link" href="#">
            last
          </a>
        </li>
      </ul>

      <div className="container mt-3" style={{ textAlign: "right" }}>
        <Link to="/board/write" className="btn btn-secondary">
          글쓰기
        </Link>
        {/* <button type="button" className="btn btn-secondary">
          Button
        </button> */}
      </div>
    </div>
  );
}

export default BoardList;
