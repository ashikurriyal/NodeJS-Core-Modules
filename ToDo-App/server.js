const http = require('http')

const data = [
  {
    "title": "TypeScript",
    "body": "Learning Node",
    "createdAt": "29/06/25, 3:20:00 PM"
  },
  {
    "title": "Prisma",
    "body": "Learning Node",
    "createdAt": "28/06/25, 11:45:00 AM"
  },
  {
    "title": "Flutter",
    "body": "Learning Node",
    "createdAt": "27/06/25, 6:10:00 PM"
  },
  {
    "title": "Next.js",
    "body": "Learning Node",
    "createdAt": "26/06/25, 9:30:00 AM"
  },
  {
    "title": "GraphQL",
    "body": "Learning Node",
    "createdAt": "25/06/25, 9:05:00 PM"
  }
]


const server = http.createServer((req, res) => {
    console.log(req.url, req.method)
    if(req.url === '/todos' && req.method === 'GET'){

        //One way
        res.writeHead(201, {
            'content-type' : 'text/html',
        })
        res.end(`<h1>Hello World</h1> <h2>Hello World</h2> <h3>Hello World</h3>`)

        //Another way
        // res.setHeader('content-type', 'application/json')
        // res.setHeader('email', 'white2@gmail.com')
        // res.statusCode = 200;
        // res.end(JSON.stringify(data))
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