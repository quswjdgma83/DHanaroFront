var express = require("express");
var router = express.Router();

let boardList = [
  {
    id: 1,
    title: "제목1",
    writter: "작성자1",
    contents: "내용1",
    wdate: "2024-02-15",
  },
  {
    id: 2,
    title: "제목2",
    writter: "작성자2",
    contents: "내용2",
    wdate: "2024-02-15",
  },
  {
    id: 3,
    title: "제목3",
    writter: "작성자3",
    contents: "내용3",
    wdate: "2024-02-15",
  },
  {
    id: 4,
    title: "제목4",
    writter: "작성자4",
    contents: "내용4",
    wdate: "2024-02-15",
  },
  {
    id: 5,
    title: "제목5",
    writter: "작성자5",
    contents: "내용5",
    wdate: "2024-02-15",
  },
];

//Board
/* GET home page */
//app.use('/board', boardRouter); app.js의 이 구문 덕분에 /board가 할상 따라다닌다.
router.get("/", function (req, res, next) {
  //   res.send("<h1>Board임</h1>");
  //views/board/board_list.ejs => views 붙어있고 뒤에 ejs 붙고\
  //   res.render("board/board_list", {});
  res.redirect("/board/list"); //다른 페이지로 이동
  //왜 직접 호출하지 않을까? -> req를 웹브라우저에서 가공해서 전달해줌
});

router.get("/list", function (req, res, next) {
  res.render("board/board_list", { boardList: boardList });
});

//board/view/1
router.get("/view/:id", function (req, res, next) {
  let id = req.params.id;
  //view/1 -> params로 받아야 한다.
  //view?id=1 => query.id로
  let board = boardList.find((board) => board.id == id);
  if (board) {
    res.render("board/board_view", { board: board });
  } else {
    res.send("<h1>데이터를 찾을 수 없습니다.</h1>");
  }
});

router.use("/write", function (req, res, next) {
  if (req.method == "GET") {
    res.render("board/board_write");
    return;
  }

  //POST일 때 들어온다
  let body = req.body;
  //마지막 데이터의 id값 알아와서 하나증가
  let id = boardList[boardList.length - 1].id;
  id = parseInt(id) + 1;
  console.log(body);
  let today = new Date();
  body = { ...body, id: id, wdate: today.toLocaleDateString() }; // 파라미터로 받은 json 원래 데이터에 항목 하나만 추가한다.

  console.log(body);
  boardList.push(body);
  res.redirect("/board/list"); //다른페이지로 이동
  //지금까지 request 객체로부터 값 받아서 작업했는데 request 무효화 하고 페이지 이동을 해야한다. redirect로 이동하자.
});
module.exports = router;
