// index.js
import express from 'express';
import cors from 'cors';
import session from 'express-session';
import partidoRoutes from './rotas/partidoRoutes.js'; 
import candidatoRoutes from './rotas/candidatoRoutes.js'; 
import rotaLogin from './rotas/rotaLogin.js'; 
import autenticar from './seguranca/autenticar.js';
import sequelize from './config/database.js';
import './models/associations.js'; 

const app = express(); 

// Configuração do host e porta
const host = 'localhost';
const porta = 4000;

// Middleware para CORS
app.use(cors({
  origin: 'http://localhost:3000', 
  credentials: true, 
}));

// Configuração da sessão
app.use(session({
  secret: 'prof3ssorm4n3ir0',
  resave: true,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 30, // 30 minutos
  },
}));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/partidos", partidoRoutes);
app.use("/candidatos", candidatoRoutes);
app.use("/login", rotaLogin);

app.use(express.static('./publico'));
app.use(autenticar, express.static('./protegido'));

app.listen(porta, host, async () => {
  try {
    await sequelize.sync(); // Sincroniza os modelos com o banco de dados
    console.log(`Servidor rodando em http://localhost:${porta}`);
  } catch (error) {
    console.error('Erro ao conectar ao banco de dados:', error);
  }
});
