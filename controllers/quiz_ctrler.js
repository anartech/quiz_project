//GET /quizes/question
exports.question = function(req, res) {
  res.render('quizes/question', {question: "Which is Italy's city capital"});
};

//GET /quizes/answer
exports.answer = function(req, res) {
  if (req.query.answer === 'Rome') {
    res.render('quizes/answer', {answer: "Correct"});
  } else {
    res.render('quizes/answer', {answer: "Incorrect"});
  }
};
