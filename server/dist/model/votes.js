'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (sequelize, DataTypes) {
  var Votes = sequelize.define('Votes', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    recipeId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });

  Votes.associate = function (model) {
    Votes.belongsTo(model.User, {
      foreignKey: 'userId'
    });
    Votes.belongsTo(model.Recipes, {
      foreignKey: 'recipeId',
      onDelete: 'CASCADE'

    });
  };

  return Votes;
};