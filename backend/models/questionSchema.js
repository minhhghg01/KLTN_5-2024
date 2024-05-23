const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    options: {
      type: Array,
      required: true,
    },
    option_correct: {
      type: Number,
      required: true,
    },
    subject: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "subject",
      },
  },
  { timestamps: true }
);

module.exports = mongoose.model("question", questionSchema);
