import carteira from "../models/carteira_model.js";

export const store = async (req, resp) => {
  try {
    const content = await carteira.create(req.body);
    resp.json();
  } catch (error) {
    resp.json(error);
  }
};
export const index = async (req, resp) => {
  try {
    const content = await carteira.find().exec();
    resp.json(content);
  } catch (error) {
    resp.json(error);
  }
};
export const show = async (req, resp) => {
  try {
    const content = await carteira
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
    const content = await carteira
      .findByIdAndUpdate(req.params.id, req.body)
      .exec();
    res.json(content);
  } catch (error) {
    res.status(400).send(error.message);
  }
};
export const destroy = async (req, resp) => {
  try {
    carteira.findByIdAndDelete(req.params.id).exec();
    resp.json();
  } catch (error) {
    resp.json(error);
  }
};
