'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (sequelize, DataTypes) {
  var Reviews = sequelize.define('Reviews', {
    content: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
  Reviews.associate = function (model) {
    Reviews.belongsTo(model.Recipes, {
      foreignKey: 'recipeId',
      onDelete: 'CASCADE'
    });
  };
  return Reviews;
};