import User from "../models/usuario_model.js";
import jwtServices from "../services/jwt-services.js";

export const signup = async (req, res) => { 
  try {
    // Criação do usuário no banco de dados
    const user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      role: req.body.role,
    });

    // Geração do token de acesso
    const token = jwtServices.generateAccessToken(user); // Certifique-se de que o método está correto

    // Resposta com o usuário e o token gerado
    return res.status(201).json({ 
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      authCode: token 
    });
  } catch (error) {
    console.error('Erro no cadastro:', error); // Log mais detalhado do erro
    return res.status(400).json({ 
      message: 'Erro ao cadastrar usuário. Verifique os dados e tente novamente.', 
      error: error.message 
    });
  }
};



export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Busca o usuário pelo email
    const user = await User.findOne({ email }).exec();

    // Se o usuário for encontrado e a senha for válida
    if (user && (await user.isValidPassword(password))) {
      // Gera o novo token de acesso
      const token = jwtServices.generateAccessToken(user);

      // Retorna os dados do usuário e o token gerado
      return res.json({ user, token });
    } else {
      return res.status(404).json({ error: 'Email ou senha incorretos' });
    }
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};


export const store = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(403).json({ error: "User not authenticated" });
    }
    const { text } = req.body;
    const user = req.user._id;
    const content = await User.create({ text, user });
    res.status(201).json(content);
  } catch (error) {
    res.status(400).send(error);
  }
};

export const index = async (req, res) => {
  try {
    const content = await User.find().exec();
    res.json(content);
  } catch (error) {
    res.status(400).json(error);
  }
};

export const show = async (req, res) => {
  try {
    const content = await User.findById(req.params.id).exec();
    res.json(content);
  } catch (error) {
    res.status(400).json(error);
  }
};

export const update = async (req, res) => {
  try {
    const content = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    }).exec();
    res.json(content);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export const destroy = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id).exec();
    res.status(204).json(); // Retorna status 204 para indicar exclusão sem conteúdo
  } catch (error) {
    res.status(400).json(error);
  }
};
