let count = 0;
const increase = () => {
  count++;
  return count;
};

console.log(increase());
console.log(increase());
count = 100; //값이 오염된다. 전역변수를 사용하고 있음
console.log(increase());
console.log(increase());

//함수안에 함수를 만들 수 있다. 외부함수와 내부함수가 이싿.
//외부함수의 반환값에 내부함수의 주소를 반환한다.

function myCounter() {
  let count = 0; //지역변수
  function increase() {
    //myCounter 함수내의 지역변수에 대한 접근이 가능하다
    count++; //함수 외부의 변수를 참조한다.
    return count; //값을 반환한다.
  }
  return increase; // 내부함수를 외부로 반환한다.
}

function myCounter2() {
  let count = 0; //지역변수
  function changeBy(value) {
    //myCounter 함수내의 지역변수에 대한 접근이 가능하다
    count += value; //함수 외부의 변수를 참조한다.
    return count; //값을 반환한다.
  }
  return {
    increase: function () {
      changeBy(+1);
    },
    decrease: function () {
      changeBy(-1);
    },
    value: function () {
      return count;
    },
  };
}

const mycounter1 = myCounter2;
mycounter1.increase();
mycounter1.increase();
console.log("mycounter1: ", mycounter1.value);

const counter1 = myCounter(); //counter1에는 counter 지역변수와 increase하는 함수가 존재
//counter1에는 increase주소, 함수를 실행하면 return increase를 만난다.
//그래서 increase함수 참조가 counter1이 된다.
console.log("counter1: ", counter1());
console.log("counter1: ", counter1());
console.log("counter1: ", counter1());

const counter2 = myCounter(); //메모리가 다르게 생성되어
console.log("counter2: ", counter2());
console.log("counter2: ", counter2());
console.log("counter2: ", counter2());

let user = { name: "홍길동", age: 23 };
console.log(Reflect.ownKeys.user);
