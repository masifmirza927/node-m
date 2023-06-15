const mongoose = require('mongoose');
const { Schema } = mongoose;

const StudentSchema = new Schema( {
    name: {
        type: String
    },
    city: {
        type: String
    }
});

const StudentModel = mongoose.model('Student', StudentSchema);
module.exports = StudentModel
