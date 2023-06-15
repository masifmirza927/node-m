const express = require('express');
const app = express()
const mongoose = require('mongoose');
const StudentModel = require("./models/StudentModel");

// middleware
app.use(express.json());

app.get("/",  (request, response) => {

     console.log("working...")
      const student =  StudentModel.findById("6489626e4c7eefde2348ed28");
      console.log(student)

})

mongoose.connect('mongodb://127.0.0.1:27017/studentsDbM').then(() => {
  app.listen(3003, () => {
    console.log(`db and server running`)
  })
})

