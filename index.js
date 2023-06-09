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

app.listen(port, () => {
    console.log(` app listening on port ${port}`)
  })