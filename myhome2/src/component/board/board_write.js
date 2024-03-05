import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function BoardWrite() {
  let history = useNavigate();
  const [title, setTitle] = useState("");
  const [writer, setWriter] = useState("");
  const [contents, setContents] = useState("");

  const onChange = (e) => {
    switch (e.target.id) {
      case "title":
        setTitle(e.target.value);
        break;
      case "writer":
        setWriter(e.target.value);
        break;
      case "contents":
        setContents(e.target.value);
        break;
      default:
        console.log("디폴트");
    }
  };
  console.log(title, writer, contents);
  const btnSave = () => {
    let url = process.env.REACT_APP_HOST_IP + "/board/save";
    axios
      .post(url, {
        title: title,
        writer: writer,
        contents: contents,
        wdate: "2024-02-23",
      })
      .then((res) => {
        //등록 후 => 이동을 해야한다 => List페이지로 이동
        //location.href => "board/list" - anchor태그
        //스택구조임 useNavigate
        history("/board/list");
      });
  };
  return (
    <div className="container" style={{ marginTop: "20px" }}>
      <div className="container" style={{ marginTop: "80px" }}>
        <h2>게시판 쓰기</h2>

        <table className="table table-hover " style={{ marginTop: "30px" }}>
          <colgroup>
            <col width="25%" />
            <col width="*" />
          </colgroup>

          <tbody>
            <tr>
              <td>제목</td>
              <td>
                <div className="mb-3" style={{ marginTop: "13px" }}>
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    name="title"
                    placeholder="제목을 입력하세요"
                    onChange={onChange}
                  />
                </div>
              </td>
            </tr>
            <tr>
              <td>작성자</td>
              <td>
                <div className="mb-3" style={{ marginTop: "13px" }}>
                  <input
                    type="text"
                    className="form-control"
                    id="writer"
                    name="writer"
                    placeholder="이름을 입력하세요"
                    onChange={onChange}
                  />
                </div>
              </td>
            </tr>
            <tr>
              <td>내용</td>
              <td>
                <div className="mb-3" style={{ marginTop: "13px" }}>
                  <textarea
                    className="form-control"
                    rows="5"
                    id="contents"
                    name="contents"
                    onChange={onChange}
                  >
                    {contents}
                  </textarea>
                </div>
              </td>
            </tr>
          </tbody>
        </table>

        <div className="container mt-3" style={{ textAlign: "right" }}>
          <button type="button" className="btn btn-secondary" onClick={btnSave}>
            등록
          </button>
        </div>
      </div>
    </div>
  );
}

export default BoardWrite;
