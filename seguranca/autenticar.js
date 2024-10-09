// seguranca/autenticar.js
export default function autenticar(requisicao, resposta, next) {
    if (requisicao.session.usuarioLogado) {
      next(); // Usuário autenticado, permite o acesso
    } else {
      resposta.status(401).json({ mensagem: 'Você precisa fazer login para acessar esta página.' });
    }
  }
  