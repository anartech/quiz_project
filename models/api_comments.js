//Definition of APIComments model
module.exports = function(sequelize, DataTypes) {
  return sequelize.define(
    'APIComment', {
      author: {
        type: DataTypes.STRING
      },
      body: {
        type: DataTypes.STRING
      }
    }
  );
};
