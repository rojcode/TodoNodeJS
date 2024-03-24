// Import necessary modules
import { Sequelize } from 'sequelize';

// Define database connection details
const database = 'rojcodeTodo';
const username = 'postgres';
const password = 'Ezkurdim_80';
const host = 'localhost';
const dialect = 'postgres';

// Connect to the database
const sequelize = new Sequelize(database, username, password, {
    host: host,
    dialect: dialect
});

export default sequelize;
