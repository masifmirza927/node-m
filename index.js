const express = require('express');
const app = express()
const port = 3003

// middleware
app.use(express.json());

app.get("/", (request, response) => {
    const student = {
        name: "ali",
        className: "BSC",
        city: "Lodhran",
    }
    response.json(student);
  })

  //http://localhost:3003/search-fruit?id=2
  app.get("/search-fruit", (request, response) => {
    console.log(request.query.index);

      const fruits = ["apple", "mango", "banana"];
      const result = fruits[request.query.index];

      const data = {
        status: "OK",
        result: result
      }

    response.json();
  })

  //http://localhost:3003/search/2
  app.get("/search/:id", (request, response) => {
    console.log(request.params.id)
    response.json({
      status: "OK"
    });

  });

  // how to get request body data in express js?
  app.post("/create-user", (request, response) => {
    console.log(request.body);
    const city = request.body.city;
    response.json({
      status: "OK"
    })

  })

app.listen(port, () => {
    console.log(` app listening on port ${port}`)
  })