// The Reviews model

export default (sequelize, DataTypes) => {
  const Reviews = sequelize.define('Reviews', {
    content: {
      type: DataTypes.STRING,
      allowNull: false
    },
  });
  /* A relationship is created between Reviews and recipes */
  Reviews.associate = (model) => {
    Reviews.belongsTo(model.Recipes, {
      foreignKey: 'recipeId',
      onDelete: 'CASCADE',
    });
  };
  return Reviews;
};
