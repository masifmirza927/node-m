const express = require('express');
const app = express()
const fs = require("fs");
const mongoose = require('mongoose');
const StudentModel = require("./models/StudentModel");
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })
const cors = require("cors");

const path = require('path');

app.use("/uploads", express.static(path.join(path.resolve(), "uploads")));

// middleware
app.use(express.json());
app.use(cors());

// app.use(express.static(__dirname + 'public'));

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
  const id = request.params.id;
  try {
    const student = await StudentModel.findById(id);
    return response.json({
      status: true,
      student: student
    })
  } catch (error) {
    return response.json({
      status: false,
      message: "Something went wrong"
    })
  }

})

app.post("/create-student", upload.single('image'), async (request, response) => {

  // image
  if (!request.file) {
    return response.json({
      status: false,
      errors: {
        image: "please provide image"
      }
    })
  }
  
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
      "status": true
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

app.put("/update-student/:id", upload.single('image'), async (request, response) => {

  const id = request.params.id;

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
    await StudentModel.findByIdAndUpdate(id, request.body);
    return response.json({
      "status": true
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

app.delete("/student-delete/:id", async (request, response) => {

  const protocol = request.protocol;
  const host = request.hostname;
  const url = request.originalUrl;
  console.log(protocol, host, url)
  return;


  const id = request.params.id;
  try {
    await StudentModel.findByIdAndDelete(id);
    return response.json({
      status: true
    })
  } catch (error) {
    return response.json({
      status: false
    })
  }

})

app.get("/search/:query", async (request, response) => {
  const q = request.params.query;

  try {
    let result = await StudentModel.find({ name: { $regex: `${q}`, '$options': 'i' } }).select({ name: 1, _id: 1 })

    return response.json({
      status: true,
      students: result
    })
  } catch (error) {
    return response.json({
      status: false,
    })
  }


})

mongoose.connect('mongodb://127.0.0.1:27017/studentsDbM').then(() => {
  app.listen(3003, () => {
    console.log(`db and server running`)
  })
})

