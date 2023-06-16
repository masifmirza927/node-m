const mongoose = require('mongoose');
const { Schema } = mongoose;

const StudentSchema = new Schema( {
    name: {
        type: String,
        required: [true, "Please provide student name"],
    },
    city: {
        type: String,
        required: [true, "Please send city"],
        enum: {
            values: ['Lodhran', 'Bahawalpur'],
            message: '{VALUE} is not supported'
          }
    },
});

const StudentModel = mongoose.model('Student', StudentSchema);
module.exports = StudentModel
