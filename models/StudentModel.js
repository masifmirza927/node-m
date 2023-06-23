const mongoose = require('mongoose');
const { Schema } = mongoose;

const StudentSchema = new Schema( {
    name: {
        type: String,
        required: [true, "Please provide student name"],
    },
    email: {
        type: String,
        required: [true, "email is required"]
    },
    image: {
        type: String,
        required: [false, "image is required"],
        get: linkUrl
    },
    address: {
        type: String,
        required: [true, "address is required"]
    },
    about: {
        type: String,
        required: [true, "please write about your self"]
    },
}, {toJSON: {getters: true} });

function linkUrl (image) {
    return "http://localhost:3003/" + image;
}

const StudentModel = mongoose.model('Student', StudentSchema);
module.exports = StudentModel
