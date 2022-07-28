"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    const products = [];
    for (let i = 0; i < 100; i++) {
      products.push({
        name: `products${i}`,
        qty: `2000${i}`,
        picture: `products${i}`,
        expiredAt: new Date(),
        isActive: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }
    return queryInterface.bulkInsert("Products", products, {});
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Products", null, {
      truncate: true,
    });
  },
};
