import transacao from "../models/transacoes_model.js";

export const store = async (req, resp) => {
  try {
    const content = await transacao.create(req.body);
    resp.json();
  } catch (error) {
    resp.json(error);
  }
};
export const index = async (req, resp) => {
  try {
    const content = await transacao.find().exec();
    resp.json(content);
  } catch (error) {
    resp.json(error);
  }
};
export const show = async (req, resp) => {
  try {
    const content = await transacao
      .findById(req.params.id)
      .populate("userId")
      .exec();
    resp.json(content);
  } catch (error) {
    resp.json(error);
  }
};
export const update = async (req, res) => {
  try {
    const content = await transacao
      .findByIdAndUpdate(req.params.id, req.body)
      .exec();
    res.json(content);
  } catch (error) {
    res.status(400).send(error.message);
  }
};
export const destroy = async (req, resp) => {
  try {
    transacao.findByIdAndDelete(req.params.id).exec();
    resp.json();
  } catch (error) {
    resp.json(error);
  }
};
