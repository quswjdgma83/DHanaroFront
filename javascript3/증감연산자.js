let x, y;

x = 7;
y = ++x;
console.log(x, y);

x = 7;
y = x++;
console.log(x, y);

let i = 1;
while (i <= 10) {
  console.log("i=", i);
  i++;
}

x = y = 5;

let output = (x, y) => {
  console.log("x= ", x, "y= ", y, "x+y = ", x + y);
};

output(x, y);

output2(x, y);

function output2(x, y) {
  console.log("x= ", x, "y= ", y, "x+y = ", x + y);
}

q = ((p = x = 1), (y = 2), (z = 3));

console.log("x= ", x, "y= ", y, "z =", z, "p= ", p, "q= ", q);

a = 1 + undefined;
console.log(a);

console.log(a ? "뭘봐" : "널봐");

b = "";

console.log(b ?? "ㅇㅇ");
console.log(b || "ㅇㅇ");

a = 1;
b = 2;
c = (a++, b++);

console.log(a, b, c); //2, 3, 2

d = (a--, b + a);
console.log(a, b, c, d); // 1, 3, 2, 4
