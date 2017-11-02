
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
  Favorites.associate = (model) => {
    Favorites.belongsTo(model.Recipes, {
      foreignKey: 'recipeId',
      onDelete: 'CASCADE',
      as: 'recipes'
    });
  };
  Favorites.associate = (model) => {
    Favorites.belongsTo(model.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });
  };

  return Favorites;
};
