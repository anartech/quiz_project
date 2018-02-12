//Definition of Users model
module.exports = function(sequelize, DataTypes) {
  return sequelize.define(
    'Users',
    {
      alias: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {msg: "User cannot be empty"}
        }
      },
      password: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {msg: "Password cannot be empty"}
        }
      }
    },
    {
      indexes: [
        {
          unique: true,
          fields: ['alias']
        }
      ]
    }
  );
};
