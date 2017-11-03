'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (sequelize, DataTypes) {
  var User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: 'This username already exists'
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: 'This email already exist'
      },
      validate: {
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
          msg: 'password is required'
        }
      }
    }
  });

  User.associate = function (model) {
    User.hasMany(model.Recipes, {
      foreignKey: 'userId',
      as: 'recipes'
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