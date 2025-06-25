//Asynchronous file system reading & writing

//2. Asynchronous
//2.2 file read -> single thread -> thread pool -> completion


const fs = require("fs");

console.log("task 1");

let text = "node js";
fs.writeFile("./hello.txt", text, { encoding: "utf-8" }, (err) => {
  if (err) {
    console.error("Error writing file:", err);
    return;
  }

  console.log('Written Successfully')
});
fs.readFile("./hello.txt", { encoding: "utf-8" }, (err, data) => {
  if (err) {
    console.error("Error reading file:", err);
    return;
  }
  //   console.log('File contents:', data);
  text = data;
  console.log(data, 'inside readfile callback');
});

console.log(text, 'from console');
console.log("task 3");
