import Carteira from "../models/carteira_model.js";

// Função para criar uma nova carteira
export const store = async (req, resp) => {
  try {
    const content = await Carteira.create(req.body);
    resp.status(201).json(content);
  } catch (error) {
    resp.status(400).json(error);
  }
};

// Função para listar todas as carteiras
export const index = async (req, resp) => {
  try {
    const content = await Carteira.find().exec();
    resp.json(content);
  } catch (error) {
    resp.status(400).json(error);
  }
};

// Função para exibir uma carteira específica pelo ID
export const show = async (req, resp) => {
  try {
    const content = await Carteira
      .findById(req.params.id)
      .populate("userId")
      .exec();
    resp.json(content);
  } catch (error) {
    resp.status(400).json(error);
  }
};

// Função para atualizar uma carteira pelo ID
export const update = async (req, res) => {
  try {
    const content = await Carteira
      .findByIdAndUpdate(req.params.id, req.body, { new: true })
      .exec();
    res.json(content);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

// Função para deletar uma carteira pelo ID
export const destroy = async (req, resp) => {
  try {
    await Carteira.findByIdAndDelete(req.params.id).exec();
    resp.status(204).send();
  } catch (error) {
    resp.status(400).json(error);
  }
};

// Função para consultar o saldo de uma carteira por userId
export const getBalance = async (req, res) => {
  try {
    const { userId: tokenUserId } = req.user;  // Obtém o userId do token JWT
    const { userId: paramUserId } = req.params;  // Obtém o userId da URL

    // Verifica se o userId do token corresponde ao userId da URL
    if (tokenUserId !== paramUserId) {
      return res.status(403).json({ error: "Acesso negado. O usuário não tem permissão para acessar esta carteira." });
    }

    // Busca a carteira associada ao userId
    const content = await Carteira.findOne({ userId: paramUserId }).exec();

    if (!content) {
      return res.status(404).json({ error: "Carteira não encontrada para este usuário." });
    }

    res.json({ balance: content.balance, currency: content.currency });
  } catch (error) {
    res.status(400).json({ error: "Erro ao consultar o saldo da carteira.", details: error.message });
  }
};

