//test 함수 -> 정규식 함수, 정규식 객체에 있는 함수이다.
//패턴 존재 유무만 판단한다
let s1 = "I like star";
let s2 = "Like you";
let s3 = "I dont't like";
console.log("/like/");
let regexp = new RegExp(/like/); //패턴객체 생성
console.log(s1, regexp.test(s1)); //true
console.log(s2, regexp.test(s2)); //대소문자 섞임
console.log(s3, regexp.test(s3)); //true
console.log("");
console.log("/like/i", "대소문자 관계없음");
regexp = new RegExp(/like/i); //대소문자 상관없음
console.log(s1, regexp.test(s1)); //true
console.log(s2, regexp.test(s2)); //true
console.log(s3, regexp.test(s3)); //true
console.log("");
console.log("/^like/i", "대소문자 관계없음,  like로 시작하는");
regexp = new RegExp(/^like/i); //대소문자 상관없음
console.log(s1, regexp.test(s1)); //false
console.log(s2, regexp.test(s2)); //true
console.log(s3, regexp.test(s3)); //false
console.log("");
console.log("/like$/i", "대소문자 관계없음,  like로 끝나는");
regexp = new RegExp(/like$/i); //대소문자 상관없음
console.log(s1, regexp.test(s1)); //false
console.log(s2, regexp.test(s2)); //true
console.log(s3, regexp.test(s3)); //false
//exec 함수=> test와 다르게 패턴에 해당하는 정보를 배열형태로 전달
console.log("------- exec -------------");
console.log("/like$/i", "대소문자 관계없음,  like로 끝나는, exec");
regexp = new RegExp(/like$/i); //대소문자 상관없음
console.log(s1, regexp.exec(s1)); //false
console.log(s2, regexp.exec(s2)); //true
console.log(s3, regexp.exec(s3)); //false
/*
I like star null
Like you null
I dont't like [ 'like', index: 9, input: "I dont't like", groups: undefined ]
exec함수는 해당 패턴에 일치자가 없으면 null을 반환하고 있으면
일치자 단어ㅏ, 인덱스, 입력문장, groups 가 있다.
010, 019, 016, 018 -->  정보를 그룹화 할 수 있다.
\d{3}  - 정수 3자리리
\d{3}-\d{4}-\d{4(}   000-0000-0000 이런 서식을 만족하는 패턴을 찾아라
(\d{3})-(\d{4})-(\d{4})  그룹으로 묶어준다.
*/
s = `
I like star
red star
blue star
I like star
I like cat
I like dog
My Dog is pretty
I love my dog
`;
console.log("--------------------------");
console.log(/like/i.test(s)); //존재유무만 판단한다.
console.log(/like/i.exec(s)); //첫번째 것만 찾는다
//ig 옵션일때 -- 문서전체에서 대소문자 상관없이 다 찾아보라
//exec함수는 함수는 한개만 찾아온다.
console.log(/like/gim.exec(s));
//여러번 등장할 경우에 : match 함수를 사용한다.
//문자열.match(정규식)
//match 함수는 정규식에 속한 함수가 아니라 문자열에 속한다.
//매개변수로 정규식(리터럴)을 받아 간다
console.log("----  match 함수 ----  문자열.match(정규식)");
result = s.match(/like/gi); //g옵션이 있을때 여러개 검색을 한다
console.log(result); //배열로 알려준다. 몇번 등장했는지는 알 수 있다
//그룹 나눠보기
s1 = "홍길동의 전화번호는 010-0123-3456 입니다. 우편번호 : 123-23"; //전화번호만
regexp = /\d{3}-\d{4}-\d{4}/; /* \d-정수, {3}-자릿수의 의미임 */
console.log(regexp.exec(s1)); //찾아낸 정보를 배열로 반환한다
console.log("()로 서로 묶어준다. group화");
regexp = /(\d{3})-(\d{4})-(\d{4})/; /* \d-정수, {3}-자릿수의 의미임 */
console.log(regexp.exec(s1)); //찾아낸 정보를 배열로 반환한다
result = regexp.exec(s1);
console.log(result[0], result[1], result[2], result[3]);
//네이밍 그룹화 - 이름을 줄 수 있다.
//(?<그룹명>정규식)
regexp =
  /(?<ph1>\d{3})-(?<ph2>\d{4})-(?<ph3>\d{4})/; /* \d-정수, {3}-자릿수의 의미임 */
console.log(regexp.exec(s1)); //찾아낸 정보를 배열로 반환한다
result = regexp.exec(s1);
console.log(result.groups["ph1"], result.groups["ph2"], result.groups["ph3"]);
