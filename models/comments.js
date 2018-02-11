//Definition of Comments model
module.exports = function(sequelize, DataTypes) {
  return sequelize.define(
    'Comment', {
      text: {
        type: DataTypes.STRING,
        validate: { notEmpty: {msg: "Comment cannot be empty"}}
      }
    }
  );
}
