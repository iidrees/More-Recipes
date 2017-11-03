'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (sequelize, DataTypes) {
  var Recipes = sequelize.define('Recipes', {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
  Recipes.associate = function (model) {
    Recipes.hasMany(model.Reviews, {
      foreignKey: 'recipeId',
      as: 'reviews'
    });
    Recipes.hasMany(model.Favorites, {
      foreignKey: 'recipeId',
      as: 'favorites'
    });
    Recipes.belongsTo(model.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    });
  };
  return Recipes;
};