//package.json 파일에 "type"속성이 module일 때 작동됨
//const assert = require('assert');
import fs from "fs";
import assert from "assert";

class CommonClass {
  //생성자
  constructor(...args) {
    //가변 매개변수
    console.log(args);
    console.log(Array.isArray(args[0])); //첫번째 요소가 배열이냐?
    if (Array.isArray(args[0])) {
      this._arr = args[0];
    } //첫번째 요소가 배열이냐
    else {
      this._arr = args;
    }
    console.log("생성자이름", this.constructor.name);
  }
  //배열의 메모리 삭제
  clear() {
    this._arr = []; //새로 할당하면 아까 있던 애들 참조변수가 다 없어지면서, GC가 여유가 될 때 메모리 삭제한다.
  }
  toArray() {
    //깊은 복사로 던져줘야 한다. 안그러면 스택 안의 메모리 공유가 벌어진다.
    //배열의 깊은복사방법: [...배열]
    return [...this._arr];
  } // 배열로 이용해서 만들라고 배열 배열 반환(배열의 복사본 반환)
  print() {
    console.log(this._arr);
  } // 데이터 출력
  remove() {
    if (this.isQueue) {
      this._arr.shift(); //큐는 앞쪽에서 삭제
    } else {
      this._arr.pop();
    }
  } // 스택의 경우 가장 마지막 요소 삭제, 큐는 가장 먼저 들어간 요소 삭제

  get isEmpty() {
    //스택이나 큐가 비면 true반환
    if (this._arr.length == 0) {
      return true;
    }
  }
  get peek() {
    //스택의 경우 가장 마지막 요소 삭제, 큐는 가장 먼저 들어간 요소 삭제
    if (this.isQueue) {
      return this._arr[0];
    } else {
      return this._arr[this._arr.length - 1];
    }
  }
  //remove와 peek 합친거, 제일 앞에 있는 것을 반환하고 삭제
  get poll() {
    if (this.isEmpty) return null; // 큐던 스택이던 비어있으면 null 반환
    if (this.isQueue) {
      this._arr.shift(); //큐는 앞쪽에서 삭제
    } else {
      this._arr.pop();
    }
  }
  get length() {}

  get isQueue() {
    return this.constructor.name.toLowerCase() == "queue";
  }
  get isStack() {
    return this.constructor.name.toLowerCase() == "stack";
  }
  toString() {
    return `${this.constructor.name} + ${this._arr}`;
  }
}

let c1 = new CommonClass();
let c2 = new CommonClass([1, 2, 3]);
let c3 = new CommonClass(1, 2, 3);

let a = c2.toArray(); //deepcopy 또는 hardcopy
a[0] = 5;
console.log(a);
console.log(c2._arr);

//공통클래스
class Stack extends CommonClass {
  //map().filter().forEach
  //s.push(1).push(2).push(3);.....
  push(data) {
    this._arr.push(data);
    return this; //나를 반환한다.
  }
  pop() {
    if (this.length > 0) {
      return this.poll;
      //return this._arr[this.length-1]
    }
  }
}

class Queue extends CommonClass {
  enqueue(data) {
    this._arr.push(data); //나를 반환한다.
    return this;
  }

  dequeue() {
    return this.poll; //제거
  }
}

let s = new Stack();
console.log("stack", s.isQueue);
console.log("stack", s.isStack);
let q = new Queue();
console.log("queue", q.isQueue);
console.log("queue", q.isStack);

a.shift(); //배열의 앞의 요소를 제거한다.
console.log("a ==", a);

s.push("A").push("B").push("C").push("D").push("E");
console.log(s._arr);

console.log(s.peek);
console.log(s._arr.pop());
console.log(s._arr.pop());
console.log(s._arr.pop());

console.log(s.toString());

q.enqueue("A").enqueue("B").enqueue("C").enqueue("D").enqueue("E");
console.log(q.toString());
console.log(q.peek);
console.log(q.dequeue());
console.log(q.dequeue());
console.log(q.toString());

assert.strictEqual("a", "a"); // === 형전환도 안하고 둘이 내용이 같은지 같으면 아무출력, 서로 다를 때 예외 ㅏㅂㄹ생
assert.deepStrictEqual(new String("a"), new Object("a"));
// 서로 타입은 다른데 내용이 같아 ===

assert.strictEqual("a", "b");
assert.deepStrictEqual(s.toArray(), ["A", "B"]);
