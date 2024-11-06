import jwtServices from "../services/jwt-services.js";

const jwtAuthenticator = (req, res, next) => {
  try {
    // Verifica se o cabeçalho de autorização está presente
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ error: 'Authorization header missing' });
    }

    // Extraí o token do formato "Bearer <token>"
    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({ error: 'Token missing' });
    }

    // Valida o token usando o serviço de JWT
    const user = jwtServices.verifyAccessToken(token);
    req.user = user; // Salva as informações do usuário no objeto da requisição
    next(); // Continua o fluxo para o próximo middleware ou função
  } catch (error) {
    // Em caso de erro de autenticação, envia um status 401 e uma mensagem apropriada
    console.error('JWT Authentication error:', error.message);
    res.status(401).json({ error: 'Invalid or expired token' });
  }
};

export default jwtAuthenticator;
