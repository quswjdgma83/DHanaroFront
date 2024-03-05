const msg = "Hello";
const profile = { name: "홍길동", age: 17 };

// msg = "안녕하세요" // msg는 상수이므로 내용을 변경할 수 없다.
//Hello라는 문자열이 저장된 주소를 msg 변수가 받는다. 안녕하세요 는 다른 동네에 저장된다. 따라서 msg의 내용변경이 불가하다.

// profile = { name: "임꺽정", age: 23 };
profile.name = "장길산"; //profile이 소유하고 있는 객체의 name과 age는 상수가 아니다. 따라서 name이 갖는 값과 age가
//갖는 값은 변경 가능하다. profile은 계속 동일한 객체 주소를 가지고 있다.
