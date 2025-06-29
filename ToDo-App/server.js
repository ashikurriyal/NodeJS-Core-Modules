const http = require('http')

const server = http.createServer((req, res) => {
    // console.log(req.url, req.method)
    // res.end('Welcome to ToDo App Server')
    if(req.url === '/todos' && req.method === 'GET'){
        res.end('Here is your all todo')
    } else if(req.url === '/todos/create-todo' && req.method === 'POST'){
        res.end('New todo created successfully')
    } else {
        res.end('Route Not Found')
    }
})


server.listen(5100, '127.0.0.1', () => {
    console.log('Server listening to port 5100')
})

// todos- Get - All todo
// todos/create-todo POST Create todo