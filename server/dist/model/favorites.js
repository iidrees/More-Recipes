'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (sequelize, DataTypes) {
  var Favorites = sequelize.define('Favorites', {
    recipeId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });
  Favorites.associate = function (model) {
    Favorites.belongsTo(model.Recipes, {
      foreignKey: 'recipeId',
      onDelete: 'CASCADE',
      as: 'recipes'
    });
  };
  Favorites.associate = function (model) {
    Favorites.belongsTo(model.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    });
  };

  return Favorites;
};