const EventEmitter = require('node:events');

class SchoolBell extends EventEmitter {}

const schoolBell = new SchoolBell();

schoolBell.on('ring', () => {
    console.log('class ended');
})
schoolBell.on('ring', () => {
    console.log('Oh no! still another class');
})
schoolBell.on('broken', () => {
    console.log('Ring is broken');
})

schoolBell.emit('ring');
schoolBell.emit('broken');