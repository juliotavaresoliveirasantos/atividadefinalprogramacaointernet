// models/associations.js
import Partido from './Partido.js';
import Candidato from './Candidato.js';

// Definir a associação um-para-muitos entre Partido e Candidato
// Um Partido pode ter muitos Candidatos
Partido.hasMany(Candidato, { foreignKey: 'partido_id', as: 'candidatos' });

// Um Candidato pertence a um Partido
Candidato.belongsTo(Partido, { foreignKey: 'partido_id', as: 'partido' });

export { Partido, Candidato };
