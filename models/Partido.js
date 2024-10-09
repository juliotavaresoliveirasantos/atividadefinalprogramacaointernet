// models/Partido.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Partido = sequelize.define('Partido', {
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  sigla: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  numero_registro: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
  },
});

export default Partido;
