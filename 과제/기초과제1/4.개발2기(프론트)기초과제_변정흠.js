// import assert from "assert"; // ESM
const assert = require("assert");

class Collection {
  constructor() {
    this._arr = [];
  }

  push(value) {
    this._arr.push(value);
    return this;
  }

  // 가장 나중에 들어간 요소 반환 (요소 삭제 없음)
  get peek() {
    if (this.isQueue) {
      return this._arr[0];
    } else {
      return this._arr[this._arr.length - 1];
    }
  }

  // 가장 나중에 들어간 요소 반환 & 삭제
  get poll() {
    if (this.isEmpty) return null;
    if (this.isQueue) {
      return this._arr.shift();
    } else {
      return this._arr.pop();
    }
  }

  // 모든 원소 지우기
  clear() {
    this._arr = [];
  }

  // array 타입 반환
  toArray() {
    return [...this._arr];
  }

  // 가장 나중에 (Stack) / 가장 먼저 들어간 요소 삭제(Queue)
  remove() {
    this.isQueue ? this._arr.shift() : this._arr.pop();
  }

  // 원소가 하나도 없으면 true
  get isEmpty() {
    return this._arr.length === 0;
  }

  // 현재 원소의 개수
  get size() {
    return this._arr.length;
  }

  // Queue를 위한 프로퍼티 (Queue에서 true로 오버라이드 됨)
  get isQueue() {
    return this.constructor.name.toLowerCase() == "queue";
  }
}

class Stack extends Collection {
  pop() {
    return this._arr.pop();
  }
}

class Queue extends Collection {
  enqueue(value) {
    this.push(value);
    return this;
  }

  dequeue() {
    return this._arr.shift();
  }

  get isQueue() {
    return true;
  }
}

// 아래 코드가 통과되도록 Collection 클래스의 method를 작성하시오!
const stack = new Stack();
stack.push(1).push(2).push(3).push(5);
assert.deepStrictEqual(stack.toArray(), [1, 2, 3, 5]);
stack.pop();
assert.strictEqual(stack.peek, 3);
stack.remove();
assert.strictEqual(stack.poll, 2);
assert.deepStrictEqual(stack.toArray(), [1]);

const queue = new Queue();
queue.enqueue(1).enqueue(3).enqueue(5);
queue.dequeue();
a = assert.deepStrictEqual(queue.toArray(), [3, 5]);
b = assert.strictEqual(queue.poll, 3);
c = assert.deepStrictEqual(queue.toArray(), [5]);
if (!stack.isEmpty) stack.clear();
if (queue.size) queue.clear();
assert.deepStrictEqual(stack.toArray(), []);
assert.deepStrictEqual(queue.toArray(), []);
