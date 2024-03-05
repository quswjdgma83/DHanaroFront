/*
    업캐스팅: 자식객체가 부모타입 참조변수에 대입된다.
    Object obj = new Person();

    Person타입(자식) => 잠깐 Object타입(부모타입) 으로의 형전환이 발생한다.
    자식이 부모타입으로 올라가는 타입전환(업캐스팅)이라고 하고 언제나 가능하다.

    다운캐스팅: 부모 객체가 자식타입 참조변수에 대입된다. 자식타입 참조변수는 부모객체가 갖고 있지 않은 요소들도 접근할 수 있다고
    생각하기 때문에 허용하면 안된다. 원칙적으로 불가능하다.
    그러나 함수의 매개변수로 전달될때 원래는 자식객체 -> 부모객체타입으로 전환된 경우에는 원상복구가 가능해야 한다.
    그래서 이때는 예외적으로 강제 형전환자에 의해 전환가능하다.

    Person p1 = (Person)ob;

배열: 연속된 메모리를 필요로 한다. 10m 10m 20m 메모리가 있음
실제 필요한 메모리 크기가 35m면 할당 불가, 단 메모리 단편들을 모아서 넣을 수는 있다.
중간에 추가 삭제가 어려우며ㅡ 크기 변경도 어렵다. 융통성이 떨어딘다. 그러나 속도는 빠르다.

링크드 리스트: 불연속적 메모리를 필요로 한다. 데이터와 다음요소의 참조로 구성되어야 한다.
새로운 데이터가 들어올 때 마다 메모리를 생성해서 서로 연결을 시켜 준다.
장점: 중간에 추가 삭제가 편하다.
단점: 느리다, 메모리도 많이 차지한다.
데이터공간 + 참조공간이 필요하다. 데이터가 많을 때는 참조공간 낭비가 심하다.
단일 링크드 리스트: 한쪽 방향으로만 검색이 가능하다
더블 링크드 리스트: 양쪽 방향으로 검색이 가능하다.
*/

class NodeData {
  data;
  next;
  constructor(data) {
    this.data = data; //데이터 공간
    this.next = null; //다음번 요소에 대한 주소값
  }
}
//데이터가 실제 데이터와 다음번 요소에 대한 참조가 필요하다.
//나 다음요소만 알고 있어서, 중간에 링크가 끊어지면 접근 불가.
//장점은 중간에 끼워넣기 중간에서 삭제가 편하다. 배열의 경우는 중간에 끼워넣기, 끼워넣은 자리를 비우기 위해서 n -> n+1번째 위치로 이동
//n이 5일 때 a[n+1] = a[n] 오버헤드가 많아서 문제됨

class MyList {
  //배열의 경위 arr=[1,2,3] 시작 arr[0]과 종료 arr[2];
  constructor() {
    this.head = new NodeData(); //비어있는 노드 하나씩을 소유, 리스트의 첫번째
    this.tail = new NodeData();
    this.head.next = this.tail; //
    this.tail.next = this.tail; // head -> (|) -> (|) -> null
  }

  insertHead(data) {
    //지역변수는 let을 쓰라고 한다.
    let temp = new NodeData(); //새로운 노드를 하나 생성한다
    temp.data = data;
    temp.next = this.head.next;
    this.head.next = temp;
  }

  insertOrdered(data) {
    let temp = new NodeData(data); // 새로운 노드 생성
    let current = this.head; // 현재 노드를 head로 초기화

    // 적절한 삽입 위치 찾기
    while (current.next != this.tail && current.next.data < data) {
      current = current.next;
    }

    // 새 노드 삽입
    temp.next = current.next;
    current.next = temp;
  }

  display() {
    let trace = this.head.next;
    while (trace != this.tail) {
      console.log(trace.data);
      trace = trace.next;
    }
  }
}

let list = new MyList();
list.insertOrdered("A");
list.insertOrdered("B");
list.insertOrdered("C");

list.display();

// list.insertHead("A");
// list.insertHead("B");
// list.insertHead("C");
// list.insertHead("D");
// list.insertHead("E");
