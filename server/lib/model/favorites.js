
export default (sequelize, DataTypes) => {
  const Favorites = sequelize.define('Favorites', {
    idRecipe: {
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
      foreignKey: 'recipesId',
      onDelete: 'CASCADE',
    });
  };
  Favorites.associate = (model) => {
    Favorites.belongsTo(model.Recipes, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });
  };

  return Favorites;
};
