//함수와 함수표현식 람다

//parseInt 함수만들기
//문자열은 ascii 코드(표준, 7bit,1bit-패리티비트(에러체크용비트))
//        unicode 코드 , 문자저장시 2byte를 사용한다.
//        unicode 코드 , 영어, 자국언어 - 통신을 할때는 1byte씩
//        utf-8  3byte 문자 시스테 : 전세계언어 다 표현 가능

let s = "124";
console.log("0".charCodeAt(0));
console.log(s.charCodeAt(0) - "0".charCodeAt(0));
console.log(s.charCodeAt(1) - "0".charCodeAt(0));
console.log(s.charCodeAt(2) - "0".charCodeAt(0));

//myparseInt("123")+myparseInt("222");
/*
s = "2814ypb.EK/WCBCQW Q3TZDMZXEISJLFEWRRFDSVCSDFDS";
알파벳만 대소문자 무시 

A -> 3
B -> 2
...
Z -> 0

myCount("abcdioewkljsdkljdf");

A  - 1
B  - 1

*/

//가변인자 전달하기
//numbers 변수에 데이터 개수나 타입에 상관없이
function myfunc(...numbers) {
  //numbers 자체가 이미 배열인데
  //배열의 배열인경우 차원하나를 제거하자
  if (Array.isArray(numbers[0])) console.log(numbers[0]);
  else console.log(numbers);
}

myfunc(1, 2); //낫개로 전달하는데 받는 함수입장에서 배열로 받는디; [1,2]
myfunc(1, 2, 3); // [1,2,3]
myfunc([1, 2, 3, 4]); //[[1,2,3,4]]

function myCount(s) {
  let count = [];
  let i;
  for (i = 0; i < 26; i++) count.push(0); //0으로 초기화 된 배열을 만들고

  //A a  -> 0번방 카운트
  //B, b -> 1번방 카운트
  for (
    i = 0;
    i < s.length;
    i++ //65
  ) {
    if (isLower(s[i])) count[getIndex(s[i], true)]++;
    if (isUpper(s[i])) count[getIndex(s[i], false)]++;
  }

  //(cnt, i) :배열의 요소 , 인덱스
  count.forEach((cnt, i) => {
    console.log(String.fromCharCode(65 + i), cnt);
  });
}

function isLower(s) {
  if (s.charCodeAt(0) >= 65 && s.charCodeAt(0) <= 81) return true;
  return false;
}

function isUpper(s) {
  if (s.charCodeAt(0) >= 97 && s.charCodeAt(0) <= 123) return true;
  return false;
}

function getIndex(s, flag) {
  if (flag) return s.charCodeAt(0) - 65;
  else return s.charCodeAt(0) - 97;
}

myCount("abca abs ANB");
