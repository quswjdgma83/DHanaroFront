import express from "express";
import ejs from "ejs";
// import http from "http";
import fs from "fs";
import path from "path";
import multer from "multer";
//모듈 import

const upload = multer({
  storage: multer.diskStorage({
    // 저장한공간 정보 : 하드디스크에 저장
    //done() 함수는 첫 번째 인수에는 에러가 있다면 에러를 넣고, 두 번째 인수에는 실제 경로나 파일 이름을 넣어주면 된다.
    //req나 file의 데이터를 가공해 done으로 넘기는 식이다.
    destination(req, file, done) {
      // 저장 위치
      done(null, "uploads/"); // uploads라는 폴더 안에 저장
    },
    filename(req, file, done) {
      // 파일명을 어떤 이름으로 올릴지
      const ext = path.extname(file.originalname); // 파일의 확장자
      //작업이 완료되면 호출될 함수:done이다
      done(null, path.basename(file.originalname, ext) + Date.now() + ext);
      // 파일이름 + 날짜 + 확장자 이름으로 저장
    },
  }),
  limits: { fileSize: 20 * 1024 * 1024 }, // 20메가로 용량 제한
});

let app = express(); //express 객체를 생성한다.

/*
  환경변수값 설정하기
  views에 ejs 파일 놓을 위치를 지정해야 한다.
  path.join 함수는 "c:/myapp", "test" => c:/myapp/test 이런식으로 단어와 단어 사이에 /를 넣어서 경로로 만들어 준다.
  _dirname: nodejs 내장변수, 현재 프로그램이 가동중인 폴더 경로를 가져온다.
  이 설정은 지금 index.js 파일이 이쓴ㄴ 위치에 views라는 폴더를 두고 그 폴더 안에 ejs를 두겠다는 의미임
  */

let dirname = path.resolve();
app.set("views", path.join(dirname, "views"));
app.set("view engine", "ejs"); //view 엔진은 ejs를 사용하겠다는 의미이다
// 이 두개의 설정을 하고 나면 response에 render 함수를 사용할 수 있다. render가 views 폴더에서 확장자가 ejs인 파일을 찾아서 클라이언트로 보낸다.

//외부에서 접속이 가능하도록 폴더를 외부에 노출시켜야 한다.
app.use(express.static(dirname + "/public")); //js, image, css 등등 static 자료
app.use("/newimage", express.static(dirname + "/uploads")); // 업로드 한것을 내보내려고 한다.
//미들웨어 - 중간에 미들웨어를 거친다. 미들웨어의 유/무와 상관없이 다른 코드들은 각자 자기 업무를 실행하면 된다.

//POST 방식으로 전송했을 때 request 객체에 body를 붙여준다.
//POST 방식으로 오는 데이트만 별도로 처리해서 body속성을 만들어서 보내준다
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  // fs.readFile(
  //   path.resolve() + "/html/add_result.html",
  //   "utf-8",
  //   (error, data) => {
  //     if (error) {
  //       res.send("Error file not found");
  //       return;
  //     }
  //     // response.writeHead(200, {"Content-Type":"text/html;charset=utf-8"});
  //     response.send(data);
  //   }
  // );
  // //ejs 엔진이랑 연결작업을 해서 보내야 한다.
  res.render("index", {
    title: "제목",
    contents: "내용",
    flowers: ["진달래", "국화", "프리지아", "장미", "튤립", "호박꽃"],
  });
});

app.get("/send", (req, res) => {
  res.send("<h1>적당히 알아서 전송함</h1>");
  res.send("<h1>적당히 알아서 전송함 22222</h1>");
});

//단순 파일이동
app.get("/filesend1", (req, res) => {
  res.render("filesend1");
});

//단순 파일이동
app.get("/filesend2", (req, res) => {
  res.render("filesend2");
});

//단순 파일이동
app.get("/filesend3", (req, res) => {
  res.render("filesend3");
});

//단순 파일이동
app.get("/filesend4", (req, res) => {
  res.render("filesend4");
});

//파일 저장하기
//multer 라이브러리를 사용할 예정
//두번째 인자로 multer 객체를 전달해야 한다. 파일을 하나만 전송받으려면 single(file태그의 name속성값)
app.post("/filesave1", upload.single("file"), (req, res) => {
  console.log(req.file);

  //나머지 값들은 그냥 body에 따라온다
  // res.json(req.file);

  //json 데이터를 일반 변수들로 해체할 때
  const {
    fieldname,
    originalname,
    encoding,
    mimetype,
    destination,
    filename,
    path,
    size,
  } = req.file;

  console.log(fieldname);
  console.log(originalname);
  console.log(filename);
  console.log("size", (size / 1024 / 1024).toFixed(0), "mb");

  //데이터베이스에 filename, originalname을 저장한다.
  res.json({ result: "OK" });
});

//배열로 받아오려면 multer의 array 함수를 사용해야 한다.
app.post("/filesave2", upload.array("file"), (req, res) => {
  req.files.forEach((item) => {
    const {
      fieldname: fileName,
      originalname,
      encoding,
      mimetype,
      destination,
      filename,
      path,
      size,
    } = item;

    console.log(fileName);
    console.log(originalname);
    console.log(filename);
    console.log("size", (size / 1024 / 1024).toFixed(0), "mb");

    //데이터베이스에 filename, originalname을 저장한다.
    res.json({ result: "OK" });
  });
});

//http://127.0.0.1:4000/download?filename=2313121.pptx
app.get("/download", (req, res) => {
  //파일명이 한글일 때 별도의 처리가 필요하다
  const filename = req.query.filename;
  const encodedFilename = encodeURIComponent(filename);
  res.setHeader(
    "Content-Disposition",
    `attachment; filename*=UTF-8''${encodedFilename}`
  );
  res.sendFile(path.resolve() + "/uploads/" + filename);
});

//캐스캐이딩 방식임 위의 url중 어느것도 해당하지 않으면 이곳으로 온다
//에러 페이지 작성을 해주면 된다.
//특정 url을 지정하지 않아서 모든 요청을 다 처리
app.use((req, res) => {
  console.log("*******");
  res.send("<h1>권한이 없는 페이지 입니다</h1>");
  //보낼 정보가 많으면 writeHead 먼저 호출하고 write 여러번 호출, 마지막에 end 호출
  //send 뒤에 send 또 부르면 안된다.
  //send -> express모듈, 대충 보내면 알아서 처리
});

app.listen(4000, () => {
  console.log("server start http://127.0.0.1:4000 start");
});
