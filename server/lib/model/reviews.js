
export default (sequelize, DataTypes) => {
  const Reviews = sequelize.define('Reviews', {
    content: {
      type: DataTypes.STRING,
      allowNull: false
    },
  });
  Reviews.associate = (model) => {
    Reviews.belongsTo(model.Recipes, {
      foreignKey: 'recipeId',
      onDelete: 'CASCADE',
    });
  };
  return Reviews;
};
