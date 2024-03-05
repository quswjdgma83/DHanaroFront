const n = 123;

console.log(typeof n); //typeof 연산자

const bi = 123n; //접미어 숫자 n
console.log(typeof bi);

const s = "abc"; //string : primitive
const ss = new String("abc"); // staring

console.log(typeof s);
console.log(typeof ss);

const s2 = "abc";
const ss2 = new String("abc");

console.log(s == s2); //true
console.log(ss2 == s2); // false --
//object == object일 때에는 서로 같은 메모기 공간을  공유하는지 물어본다

let c = n + bi;
console.log("c = ", c, typeof c);
