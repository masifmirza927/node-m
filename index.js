const express = require('express');
const app = express()
const mongoose = require('mongoose');
const StudentModel = require("./models/StudentModel");

// middleware
app.use(express.json());

app.get("/",  async (request, response) => {

     console.log("line 11, top")
      const student =  await StudentModel.findById("6489626e4c7eefde2348ed28");
      
      console.log(student);
      console.log("line 15, bottom")

})

mongoose.connect('mongodb://127.0.0.1:27017/studentsDbM').then(() => {
  app.listen(3003, () => {
    console.log(`db and server running`)
  })
})

