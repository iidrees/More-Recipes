// Favorite Model
export default (sequelize, DataTypes) => {
  const Favorites = sequelize.define('Favorites', {
    recipeId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  });
  /* Favorites has a relationship with Reipes and User */
  Favorites.associate = (model) => {
    Favorites.belongsTo(model.Recipes, {
      foreignKey: 'recipeId',
      onDelete: 'CASCADE',
      as: 'recipes'
    });
  };
  Favorites.associate = (model) => {
    Favorites.belongsTo(model.Users, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });
  };

  return Favorites;
};
