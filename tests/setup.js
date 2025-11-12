// Jest global setup for database
const { sequelize } = require('../src/models');

beforeAll(async () => {
  await sequelize.sync({ force: true }); // recreate schema
});

afterAll(async () => {
  await sequelize.close();
});
