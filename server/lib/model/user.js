// User Model
export default (sequelize, Sequelize) => {
  const User = sequelize.define('User', {
    username: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
      validate: {
        is: /^[a-z]+$/i
      }
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        isEmail: {
          msg: 'Please enter a valid email address'
        },
        isLowercase: {
          msg: 'your email must be in lowercase'
        }
      },
      unique: {
        args: true,
        msg: 'This email is already taken, enter a new email address'
      },
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
  });
  /* User has a relationship with Recipes, Favorites and Votes */
  User.associate = (model) => {
    User.hasMany(model.Recipes, {
      foreignKey: 'userId',
      as: 'recipes',
    });
    User.hasMany(model.Favorites, {
      foreignKey: 'userId',
      as: 'favorites'
    });
    User.hasOne(model.Votes, {
      foreignKey: 'userId',
      as: 'votes'
    });
  };
  return User;
};
