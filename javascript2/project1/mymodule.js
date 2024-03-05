function sigma(limit = 10) {
  if (limit < 10) {
    return; // 값을 지정 안해주면 undefined가 추가된다.
  }
  let s = 0;
  let i;

  for (i = 1; i <= limit; i++) {
    s += 1;
  }
  return s;
}
console.log(sigma());
console.log(sigma(100));

//다른 파일에서 이 함수를 접근할 수 있다.
exports.sigma = sigma;
