const Sequelize = require('sequelize');

class Database {
  constructor() {
    this.host = process.env.DB_HOST || 'localhost';
    this.username = process.env.DB_USERNAME || 'root';
    const password = process.env.DB_PASSWORD || '';
    this.usedPassword = Boolean(password);
    this.database = process.env.DB_NAME || 'github_feed';

    this.connection = new Sequelize(this.database, this.username, password, {
      dialect: 'mysql',
      host: this.host
    });
  }

  getConnection() {
    return this.connection;
  }
}

// this makes the class singleton
module.exports = new Database();
