let fs = require("fs");

fs.readFile("비동기모드.js", "utf-8", (err, data) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log(data);
});

console.log("ending ,,,,,,,,,,,");
