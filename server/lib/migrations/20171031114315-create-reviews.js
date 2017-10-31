
module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('Reviews', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      content: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      recipesId: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        refrences: {
          model: 'Recipes',
          key: 'id',
          as: 'recipesId',
        },
      },
    }),
  down: (queryInterface /* , Sequelize */) => {
    return queryInterface.dropTable('Reviews');
  }
};
