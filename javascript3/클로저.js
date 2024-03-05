let user;

//블럭안에 객체가 선언되면
{
  const privateUser = { name: "홍길동", age: 34 };
  console.log(privateUser);
  user = privateUser;
}

//privateUser ==> { name: "홍길동", age: 34 }
//user ==> { name: "홍길동", age: 34 }

// 블럭이 종료하면 privateUser가 사라지기 때문에 메모리가 부족한 상황이 오면 객체를 메모리에서 제거해야하는데 user이 이 객체를
// 참조하고 있기 때문에 메모리를 해제하지 않음
