const http = require("http");
const path = require("path");
const fs = require("fs");

const filePath = path.join(__dirname, "./db/todo.json");

const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const pathname = url.pathname;

  //Get all-todos
  if (pathname === "/todos" && req.method === "GET") {
    const data = fs.readFileSync(filePath, { encoding: "utf-8" });

    //One way
    res.writeHead(201, {
      "content-type": "application/json",
    });
    res.end(data);

    //Another way
    // res.setHeader('content-type', 'application/json')
    // res.setHeader('email', 'white2@gmail.com')
    // res.statusCode = 200;
    // res.end(JSON.stringify(data))

    //post a todo
  } else if (pathname === "/todos/create-todo" && req.method === "POST") {
    let data = "";
    req.on("data", (chunk) => {
      data = data + chunk;
    });

    req.on("end", () => {
      const { title, body } = JSON.parse(data);
      const createdAt = new Date().toLocaleString();
      const allTodos = fs.readFileSync(filePath, { encoding: "utf-8" });
      const parsedAllTodos = JSON.parse(allTodos);
      parsedAllTodos.push({ title, body, createdAt });

      fs.writeFileSync(filePath, JSON.stringify(parsedAllTodos, null, 2), {
        encoding: "utf-8",
      });
      res.end(JSON.stringify({ title, body, createdAt }, null, 2));
    });
  } else if (pathname === "/todo" && req.method === "GET") {
    const title = url.searchParams.get("title");
    console.log("Title from query:", title);

    // Read the todos
    const data = fs.readFileSync(filePath, { encoding: "utf-8" });
    const parsedData = JSON.parse(data);

    // Find todo by title (case-insensitive match)
    const todo = parsedData.find(
      (todo) => todo.title.toLowerCase().trim() === title.toLowerCase().trim()
    );

    // If not found, send 404
    if (!todo) {
      res.writeHead(404, { "content-type": "application/json" });
      return res.end(JSON.stringify({ message: "Todo not found" }));
    }

    // If found, send the todo
    res.writeHead(200, { "content-type": "application/json" });
    res.end(JSON.stringify(todo, null, 2));
  }

  //patch
  else if (pathname === "/todos/update-todo" && req.method === "PATCH") {
    const title = url.searchParams.get("title");
    let data = "";
    req.on("data", (chunk) => {
      data += chunk;
    });

    req.on("end", () => {
      const { body } = JSON.parse(data);
      const allTodos = fs.readFileSync(filePath, { encoding: "utf-8" });
      const parsedAllTodos = JSON.parse(allTodos);

      const todoIndex = parsedAllTodos.findIndex(
        (todo) => todo.title.toLowerCase().trim() === title.toLowerCase().trim()
      );

      if (todoIndex === -1) {
        res.writeHead(404, { "content-type": "application/json" });
        return res.end(JSON.stringify({ message: "Todo not found" }));
      }

      parsedAllTodos[todoIndex].body = body;

      fs.writeFileSync(filePath, JSON.stringify(parsedAllTodos, null, 2), {
        encoding: "utf-8",
      });

      res.writeHead(200, { "content-type": "application/json" });
      res.end(
        JSON.stringify(
          {
            title: parsedAllTodos[todoIndex].title,
            body,
            createdAt: parsedAllTodos[todoIndex].createdAt,
          },
          null,
          2
        )
      );
    });
  } else {
    res.end("Route Not Found");
  }
});

server.listen(5100, "127.0.0.1", () => {
  console.log("Server listening to port 5100");
});
