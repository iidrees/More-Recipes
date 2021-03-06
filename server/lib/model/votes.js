// Votes Model
export default (sequelize, DataTypes) => {
  const Votes = sequelize.define('Votes', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    recipeId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });
  /* Votes has a relationship with User and Recipes */

  Votes.associate = (model) => {
    Votes.belongsTo(model.Users, {
      foreignKey: 'userId',
    });
    Votes.belongsTo(model.Recipes, {
      foreignKey: 'recipeId',
      onDelete: 'CASCADE'

    });
  };

  return Votes;
};
