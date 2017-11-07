// Recipes Model
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
    upVotes: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    downVotes: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
  });
  /* A relationship is created between Recipes
  and Reviews, Favorites, and User */
  Recipes.associate = (model) => {
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
      onDelete: 'CASCADE',
    });
  };
  return Recipes;
};
