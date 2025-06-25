//1. Synchronus
//1.1 file read / I/o intensive task -> not go to thread pool -> 




//2. Asynchronous
//2.2 file read -> single thread -> thread pool -> completion

//reading text from hello.txt file and writing
const fs = require('fs')
console.log('task 1')
const text = 'Learning node js file system reading and writing'
fs.writeFileSync('./hello.txt', text)
console.log('task 3')
const data = fs.readFileSync('./hello.txt', {encoding: 'utf-8'})

console.log('task 4')
console.log(data)


// fs.writeFileSync('./hello.txt', text)