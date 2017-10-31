
export default (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: 'This email already exist'
      },
      validate: {
        isEmail: {
          arg: true,
          msg: 'This email already exist'
        },
        notEmpty: {
          msg: 'Email is required.'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Email is required'
        }
      }
    },
  });

  User.associate = (model) => {
    User.hasMany(model.Recipes, {
      foreignKey: 'userId',
      as: 'recipes',
    });
    User.hasMany(model.Favorites, {
      foreignKey: 'userId',
    });
  };
  return User;
};
