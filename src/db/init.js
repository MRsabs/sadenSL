const Sequelize = require('sequelize');
const path = require('path');
const { app } = require('electron');
const isDev = require('electron-is-dev');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: isDev
    ? 'database.sqlite'
    : path.join(app.getPath('userData'), 'sadensl.sqlite'),
});
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = {
  sequelize,
};
