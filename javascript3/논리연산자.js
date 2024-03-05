for (i = 1; i < 11; i++) {
  console.log(i / 10);
}

const addPoints = (a, b) => {
  //   result = a + b;
  i = a.toString().length;
  j = b.toString().length;
  k = i > j ? i : j;

  longer = k - 2;
  result = a * 10 ** longer + b * 10 ** longer;
  real_result = result * 10 ** -longer;
  return real_result;
};

console.log(addPoints(0.213540003232, 0.1));

// k = 0.00001;
// k = k.toString();
// console.log(k.length);
