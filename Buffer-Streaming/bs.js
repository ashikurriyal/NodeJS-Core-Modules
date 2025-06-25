const fs = require("fs");

// fs.readFile("./hello-world.txt", { encoding: "utf-8" }, (err, data) => {
//   if (err) {
//     console.error("Error reading file:", err);
//     return;
//   }

//   fs.writeFile("./hello.txt", data, { encoding: "utf-8" }, (err) => {
//     if (err) {
//       console.error("Error writing file:", err);
//       return;
//     }
//     console.log("Written Successfully");
//   });
// });

const readStream = fs.createReadStream("./hello-world.txt", {
  encoding: "utf-8",
});
const writeStream = fs.createWriteStream("./hello.txt", { encoding: "utf-8" });

readStream.on("data", (data) => {
  console.log(data);

  writeStream.write(data, (err) => {
    if (err) {
      throw Error("Error", err);
    }
  });
});


//error catching for readstream
readStream.on("error", (err) => {
  if (err) {
    throw Error("Error", err);
  }
});

//error catching for writestream
writeStream.on("error", (err) => {
  if (err) {
    throw Error("Error", err);
  }
});

readStream.on('end', () => {
    console.log('reading ending');
    writeStream.end()
})

writeStream.on('finish', () => {
    console.log('written Successfully')
})