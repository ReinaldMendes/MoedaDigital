import transacao from "../models/transacoes_model.js";



export const store = async (req, resp) => {
  try {
    const content = await transacao.create(req.body);
    resp.status(201).json(content);  // Retorna o conteúdo criado e status 201
  } catch (error) {
    resp.status(400).json(error);
  }
};

export const index = async (req, resp) => {
  try {
    const content = await transacao.find().exec();
    resp.json(content);
  } catch (error) {
    resp.status(400).json(error);
  }
};

export const show = async (req, resp) => {
  try {
    const content = await transacao
      .findById(req.params.id)
      .populate(["walletFrom", "walletTo"])  // Popula as carteiras associadas
      .exec();
    resp.json(content);
  } catch (error) {
    resp.status(400).json(error);
  }
};

export const update = async (req, res) => {
  try {
    const content = await transacao
      .findByIdAndUpdate(req.params.id, req.body, { new: true })  // Retorna a transação atualizada
      .exec();
    res.json(content);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export const destroy = async (req, resp) => {
  try {
    await transacao.findByIdAndDelete(req.params.id).exec();
    resp.status(204).json();  // Retorna status 204 sem conteúdo
  } catch (error) {
    resp.status(400).json(error);
  }
};
