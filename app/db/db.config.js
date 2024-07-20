import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('db_banco_solar', 'postgres', '123456', {
    host: 'localhost',
    dialect: 'postgres',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 1000
    }
  });

  export default sequelize;