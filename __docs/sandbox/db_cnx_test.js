/**
 * @file Test la connexion à la base de données
 * @usage `node ./__docs/sandbox/db_cnx_test.js`
 */

import "dotenv/config";
import { sequelize } from '../../src/sequelize-client.js';

// IIFE = Immediately Invoked Function Expression
(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();
