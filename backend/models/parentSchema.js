const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    rollNum_student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'student'
    },
    email: {
        type: String,
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: "Parent"
    },
    
});

module.exports = mongoose.model("student", studentSchema);