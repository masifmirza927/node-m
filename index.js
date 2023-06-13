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

  const students = [];
  // how to get request body data in express js?
  app.post("/create-user", (request, response) => {
    console.log(request.body);
    students.push(request.body);
    response.json({
      students: students
    });

  })

  app.delete("/user-delete/:id", (request, response) => {
      const index = request.params.id;
    
      students.splice(index, 1);
      response.json({
        status: true,
        students: students
      });
  })

  app.put("/user-update/:id", (request, response) => {
    // get index numbe from params
      const index = request.params.id;

// select target object/student
      let target = students[index];
  
      if(target) {
        students[index] = request.body;
        response.json({
          status: "ok",
          students: students
        })
      } else {
        response.json({
          status: "false",
          message: "student not found"
        })
      }
  })


app.listen(port, () => {
    console.log(` app listening on port ${port}`)
  })