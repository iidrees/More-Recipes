
export default (sequelize, DataTypes) => {
  const Recipes = sequelize.define('Recipes', {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false
    },
  });
  Recipes.associate = (model) => {
    Recipes.hasMany(model.Reviews, {
      foreignKey: 'recipeId',
      as: 'reviews'
    });
    Recipes.hasMany(model.Votes, {
      foreignKey: 'recipeId',
      as: 'votes'
    });
    Recipes.belongsTo(model.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });
  };
  return Recipes;
};
