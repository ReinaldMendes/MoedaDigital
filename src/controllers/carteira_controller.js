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
    const content = await Carteira.findOne({ userId: req.params.userId }).exec();
    if (content) {
      res.json({ balance: content.balance });
    } else {
      res.status(404).json({ error: "Carteira não encontrada para este usuário." });
    }
  } catch (error) {
    res.status(400).json(error);
  }
};
