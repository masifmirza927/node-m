const express = require('express');
const app = express()
const fs = require("fs");
const mongoose = require('mongoose');
const StudentModel = require("./models/StudentModel");
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })



// middleware
app.use(express.json());

app.post("/upload-image", upload.single('image'), async (request, response) => {

  let ext = request.file.mimetype.split("/")[1];

  console.log(ext);


  // 
  if (ext == "jpeg" || ext == "gif" || ext == "png") {

    if (ext == "plain") {
      ext = "txt";
    }
    fs.rename(request.file.path, request.file.path + "." + ext, () => { console.log("done") });
    return response.json({
      status: "OK"
    })

  } else {
    fs.unlink(request.file.path, () => { console.log("deleted")})
    return response.json({
      status: "not allowed"
    })
  }

})




app.get("/students", async (request, response) => {

  const students = await StudentModel.find();

  response.json({
    "status": true,
    students: students
  })

})

app.post("/create-student", async (request, response) => {
  const newStudent = request.body;

  try {
    await StudentModel.create(newStudent);
    return response.json({
      "status": "OK"
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      let errors = {};

      Object.keys(error.errors).forEach((key) => {
        errors[key] = error.errors[key].message;
      });

      return response.json({
        "status": false,
        errors: errors
      })
    }
  }
})



mongoose.connect('mongodb://127.0.0.1:27017/studentsDbM').then(() => {
  app.listen(3003, () => {
    console.log(`db and server running`)
  })
})

