//Definition of APIComments model
module.exports = function(sequelize, DataTypes) {
  return sequelize.define(
    'APIComment', {
      user: {
        type: DataTypes.STRING
      },
      description: {
        type: DataTypes.STRING
      }
    }
  );
};
