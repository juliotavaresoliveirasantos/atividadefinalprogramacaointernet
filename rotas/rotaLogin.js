// rotas/rotaLogin.js
import { Router } from 'express';

const rotaLogin = new Router();

const usuarioCorreto = 'renato';
const senhaCorreta = '123';

rotaLogin.post('/', (requisicao, resposta) => {
  const { usuario, senha } = requisicao.body;

  if (usuario === usuarioCorreto && senha === senhaCorreta) {
    requisicao.session.usuarioLogado = true; // Armazena sessão de usuário logado
    resposta.status(200).json({ mensagem: 'Login bem-sucedido!' });
  } else {
    resposta.status(401).json({ mensagem: 'Credenciais incorretas. Tente novamente.' });
  }
});

rotaLogin.get('/logout', (requisicao, resposta) => {
  requisicao.session.destroy((err) => {
    if (err) {
      return resposta.status(500).send('Erro ao fazer logout!');
    }
    resposta.clearCookie('connect.sid'); // Limpa cookie de sessão
    resposta.sendStatus(200); // Responde com sucesso
  });
});

export default rotaLogin;
