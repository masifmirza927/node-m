const express = require('express');
const app = express()
const fs = require("fs");
const mongoose = require('mongoose');
const StudentModel = require("./models/StudentModel");
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })
const cors = require("cors");

// middleware
app.use(express.json());
app.use(cors());

app.post("/upload-image", upload.single('image'), async (request, response) => {
  // console.log(request.body.name);
  // const data = {
  //   name: request.body.name,
  //   city: request.body.city
  // }

  if (request.file.mimetype == "image/png" || request.file.mimetype == "image/jpg" || request.file.mimetype == "image/jpeg") {
    let ext = request.file.mimetype.split("/")[1];
    if (ext == "plain") { ext = "txt"; }
    fs.rename(request.file.path, request.file.path + "." + ext, () => { console.log("done") });
    return response.json({
      status: "OK"
    })

  } else {
    fs.unlink(request.file.path, () => { console.log("deleted") })
    return response.json({
      status: "not allowed"
    })
  }

})


app.get("/students", async (request, response) => {

  try {
      const students = await StudentModel.find();
      return response.json({
          status: true,
          students: students
      })
  } catch (error) {
      return response.json({
          status: false,
          msg: "Students not found"
      })
  }
})

app.get("/student/:id", async (request, response) => {

  try {
    const students = await StudentModel.find();
    return response.json({
      status: true,
      students: students
    })
  } catch (error) {
    return response.json({
      status: false,
      message: "Something went wrong"
    })
  }

})

app.post("/create-student", upload.single('image'), async (request, response) => {


  if (request.file.mimetype == "image/png" || request.file.mimetype == "image/jpg" || request.file.mimetype == "image/jpeg") {
    let ext = request.file.mimetype.split("/")[1];
    if (ext == "plain") { ext = "txt"; }
    const NewImgName = request.file.path + "." + ext;
    request.body.image = NewImgName;
    fs.rename(request.file.path, NewImgName, () => { console.log("done") });

  } else {
    fs.unlink(request.file.path, () => { console.log("deleted") });
  }

  try {
    await StudentModel.create(request.body);
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

