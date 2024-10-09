// models/Candidato.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Candidato = sequelize.define('Candidato', {
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  numero_candidato: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
  },
  partido_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Partidos',
      key: 'id',
    },
  },
});

export default Candidato;
