
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
    Recipes.belongsTo(model.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });
  };
  return Recipes;
};
