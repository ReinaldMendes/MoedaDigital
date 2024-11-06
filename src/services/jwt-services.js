import jsonwebtoken from "jsonwebtoken";

// Função para gerar o token de acesso
const generateAccessToken = (user) =>
  jsonwebtoken.sign(
    {
      _id: user._id,
      email: user.email,
      role: user.role,
    },
    process.env.JWT_PRIVATE_KEY,
    {
      expiresIn: "1d", // O token expira após 1 dia
    }
  );

// Função para verificar o token de acesso
const verifyAccessToken = (token) => {
  try {
    // Verifica e decodifica o token
    const decoded = jsonwebtoken.verify(token, process.env.JWT_PRIVATE_KEY);

    // Retorna o conteúdo do token (payload), que deve conter os dados do usuário
    return decoded;
  } catch (error) {
    // Lança um erro caso o token seja inválido ou expirado
    throw new Error("Token inválido ou expirado");
  }
};

export default { generateAccessToken, verifyAccessToken };

