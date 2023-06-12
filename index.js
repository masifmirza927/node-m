const express = require('express');
const app = express()
const port = 3003

app.get("/", (request, response) => {
    const student = {
        name: "ali",
        className: "BSC",
        city: "Lodhran",
    }

    response.json(student);
  })

  app.get("/search-fruit", (request, response) => {
    console.log(request.query.id);

      const fruits = ["apple", "mango", "banana"];
      const result = fruits[1];

    response.json({
      status: "OK",
      result: result
    });
  })

  app.get("/search/:id", (request, response) => {
    console.log(request.params.id)
    response.json({
      status: "OK"
    });

  })

app.listen(port, () => {
    console.log(` app listening on port ${port}`)
  })