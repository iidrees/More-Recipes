
export default (sequelize, DataTypes) => {
  const Reviews = sequelize.define('Reviews', {
    content: {
      type: DataTypes.STRING,
      allowNull: false
    },
  });
  Reviews.associate = (model) => {
    Reviews.hasMany(model.Reviews, {
      foreignKey: 'recipesId',
      onDelete: 'CASCADE',
    });
  };
  return Reviews;
};
