//Definition of Quiz model
module.exports = function(sequelize, DataTypes) {
  return sequelize.define(
    'Quiz', {
      question: {
        type: DataTypes.STRING,
        validate: { notEmpty: {msg: "Question cannot be empty"}}
      },
      answer: {
        type: DataTypes.STRING,
        validate: { notEmpty: {msg: "Answer cannot be empty"}}
      }
    }
  );
}
