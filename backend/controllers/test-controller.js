const question = require("../models/questionSchema.js");

const testCreate = async (req, res) => {
  const subject = req.params.id;
  console.log(subject);
  
  const questions = await question.find({subject: subject});
  const randomQuestions = questions.sort(()=>Math.random()-Math.random()).slice(0, 10)
  return res.send({
    questions: randomQuestions,
    message: "ok",
    success: true,
    length: questions.length,
  });
};

module.exports = { testCreate };
