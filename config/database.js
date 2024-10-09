import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('cadastro_eleitoral', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
});

export default sequelize;
