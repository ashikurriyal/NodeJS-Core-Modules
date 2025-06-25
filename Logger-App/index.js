const path = require('path')
const fs = require('fs')

const inputArguments = process.argv.slice(2)
const text = inputArguments.join(' ').concat('\n');

const timestamp = new Date().toISOString();
// console.log(timestamp)

const message = `${text} ${timestamp}\n`
// console.log(text)

if(!message) {
    console.log('Please Provide a message to log')
    console.log('Example: node index.js Hello World')
    process.exit(1); //if there is no text closes the server
}
console.log(text)

const filePath = path.join(__dirname, 'log.txt');
fs.appendFile(filePath, message, {encoding : 'utf-8'}, () => {
    console.log('your log added successfully')
})
console.log(filePath)