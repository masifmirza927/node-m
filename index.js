const express = require('express');
const app = express()
const mongoose = require('mongoose');
const StudentModel = require("./models/StudentModel");

// middleware
app.use(express.json());

app.get("/students",  async (request, response) => {

     console.log("line 11, top")
      const students =  await StudentModel.find();

      response.json({
        "status": true,
        students: students
      })

})

app.post("/create-student", async (request, response) => {
        const newStudent = request.body;
        await StudentModel.create(newStudent);

        response.json({
          "status": true,
          "msg": 'successfully created'
        })
})



mongoose.connect('mongodb://127.0.0.1:27017/studentsDbM').then(() => {
  app.listen(3003, () => {
    console.log(`db and server running`)
  })
})

