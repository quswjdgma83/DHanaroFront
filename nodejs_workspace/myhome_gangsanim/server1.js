import http from 'http';
import fs from 'fs';
import ejs from 'ejs'; //npm install ejs
import url from 'url';
import path from 'path'; //경로확인 라이브러리 html파일이 있는 위치를
//맥북은 상대경로   ./html/index.html 이 작동안됨 
//path.resolve() 절대경로 가져옴 

//함수 맵을 만들자 
//일일이 if문 사용말고 for문써서 해당 url이 오면 함수를 호출하자 
const pathMap=[
    {"path":"/",             "func":index},  
    {"path":"/test",         "func":test},
    {"path":"/add",          "func":add},  //입력창으로 이동 
    {"path":"/add_result",   "func":add_result}, //입력처리, 디비에 넣고
    {"path":"/weekpay",      "func":weekpay},
    {"path":"/weekpay_proc", "func":weekpay_proc}, 
    //결과를 html이 아니고 JSON으로 보낸다  Restful API를 만들자 
];


//ejs => html 문서와 json객체를 합쳐서 새로운 html을 만든다 
//       렌더링 
//createServer 클라이언트가 접속요청을 하면 자신한테 전달된 callback함수 호출 
let server = http.createServer((request, response)=>{

    let pathName = url.parse(request.url, true).pathname;
    if(request.method=="GET")
    {
        let idx = pathMap.findIndex((item)=> item.path == pathName);
        if( idx !=-1)
        {
            pathMap[idx].func(request, response);
        }
    }
    else if(request.method=="POST" )
    {}
    else 
    {
       response.writeHead(200, {"Content-Type":"text/html;charset=utf-8"});
       response.end("<h1>한글도가능</h1>");
    } 
});

server.listen(3000, "127.0.0.1", ()=>{
    console.log("http://127.0.0.1:3000 start");
    //listen 이 완료되면 호출된다. 
})

//nodemon - node모니터링 -> 소스 바뀌면 자동으로 재시작을 한다 
//우분트에서  putty 로 들어가서 접속해서 p2라는 프로그램 또는 ngnix 엔진에 올리기도 하는데
//p2를 설치하고 가동시키자 - p2 : 우분트에서 node를 데몬으로 실행시키게 한다. 

//npm install -g nodemon 
//nodemon server1

function index(request, response)
{
    //1.html 파일 읽기 
    //console.log( path.resolve());
    fs.readFile(path.resolve() + '/html/index.html', "utf-8", (error, data)=>{
        if(error)
        {
            console.log("파일을 찾을 수 없습니다.");
            return;
        }

        let result = ejs.render(data); //현재는 아무값도 전달하지 않아서 render를 거치나
                     //안거치나 똑같음 
        response.writeHead(200, {"Content-Type":"text/html;charset=utf-8"});
        response.end(result);
    })
}

function test(request, response)
{
    //get방식 파싱 --> name=Tom  
    let params = url.parse(request.url, true).query; //JSON형태로 저장된다.
    console.log( params );  // 
    fs.readFile( path.resolve() + '/html/test.html', "utf-8", (error, data)=>{
        if(error)
        {
            console.log("파일을 찾을 수 없습니다.");
            return;
        }
        //ejs.render(파일내용:string, {}:보낼데이터)
        //{name:"Tom"}  => html 문서에서는 <%=name%> , ejs 엔진임 
        //{name:"Tom"}  => html 문서에서는 |name => jade, pug엔진, 거의 안씀

        let result = ejs.render(data, params); //현재는 아무값도 전달하지 않아서 render를 거치나
                     //안거치나 똑같음 
        response.writeHead(200, {"Content-Type":"text/html;charset=utf-8"});
        response.end(result);
    });
}

function add(request, response)
{
    //1.html 파일 읽기 
    //console.log( path.resolve());
    //별도의 파라미터 처리 없음 
    fs.readFile(path.resolve() + '/html/add.html', "utf-8", (error, data)=>{
        if(error)
        {
            console.log("파일을 찾을 수 없습니다.");
            return;
        }

        let result = ejs.render(data); //현재는 아무값도 전달하지 않아서 render를 거치나
                     //안거치나 똑같음 
        response.writeHead(200, {"Content-Type":"text/html;charset=utf-8"});
        response.end(result);
    })
}

function add_result(request, response)
{
    //get방식 파싱 --> form태그를 타고 input태그의 name속성이 
    //    /add_result?x=5&y=8 
    let params = url.parse(request.url, true).query; //JSON형태로 저장된다.
    console.log( params );  // 
    fs.readFile( path.resolve() + '/html/add_result.html', "utf-8", (error, data)=>{
        if(error)
        {
            console.log("파일을 찾을 수 없습니다.");
            return;
        }
        //params: {x:5, y:7, result:12}  ==> {...params}
        if( params.operator == "1")
        {
            operator="+";
            add_result = parseInt(params.x) + parseInt(params.y);
        }
        else if ( params.operator == "2")
            add_result = parseInt(params.x) - parseInt(params.y);
        else if ( params.operator == "3")
            add_result = parseInt(params.x) * parseInt(params.y);
        else 
            add_result = parseInt(params.x) / parseInt(params.y);
        
        let result = ejs.render(data, 
            {...params, "result":add_result, "operstor":operator}); 
        response.writeHead(200, {"Content-Type":"text/html;charset=utf-8"});
        response.end(result);
    });
}

/*

  <a  href="/weekpay">주급계산</a>
  weekpay.html  
  name 
  work_time  
  per_pay
  weekpay_result.html

  ajax로 구축 -  weekpay_result.html 필요 없어짐  
*/

function weekpay(request, response) //페이지이동만 
{
    //1.html 파일 읽기 
    //console.log( path.resolve());
    //별도의 파라미터 처리 없음 
    fs.readFile(path.resolve() + '/html/week_pay.html', "utf-8", (error, data)=>{
        if(error)
        {
            console.log("파일을 찾을 수 없습니다.");
            return;
        }

        let result = ejs.render(data); //현재는 아무값도 전달하지 않아서 render를 거치나
                     //안거치나 똑같음 
        response.writeHead(200, {"Content-Type":"text/html;charset=utf-8"});
        response.end(result);
    })
}

// weekpay_proc?name=Tom&work_time=10&per_pay=1000
function weekpay_proc(request, response) //페이지이동만 
{
    let params = url.parse(request.url, true).query; //우리가 보낸 정보가 여기 있음
    console.log( params );
    let name = params.name; 
    let work_time = params.work_time;
    let per_pay = params.per_pay;
    let week_pay = work_time * per_pay; 
    let result = {"name":name, "work_time":work_time, 
    "per_pay":per_pay, "week_pay":week_pay};

    //content-type이 application/json 이어야 한다 => @RestControler가 대신 함   
    response.writeHead(200, {"Content-Type":"application/json;charset=utf-8"});
    console.log( result );
    //JSON객체를 전달할때 String타입으로 전환해서 보내야만 한다 
    response.end(JSON.stringify(result)); //결과를 json 형태로 보내야 한다. 
}






