import User from "../models/usuario_model.js";
import jwtServices from "../services/jwt-services.js";

export const signup = async (req, res) => {
  try {
    const user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      role: req.body.role,
    });
    const token = jwtServices.generateAcessToken(user);
    res.json(token);
  } catch (error) {
    res.status(400).send(error);
  }
};

export const login = async (req, res) => {
  try {
    const user = await User.findOne({
      email: req.body.email,
    }).exec();
    if (user && (await user.isValidPassword(req.body.password))) {
      const token = jwtServices.generateAcessToken(user);
      res.json(token);
    } else {
      res.status(404).json({
        error: "Email os passaword incorrect",
      });
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};
export const store = async (req, res) => {
  try {
    const { text } = req.body;
    const user = req.user._id;
    const content = await User.create({
      text,
      user,
    });
    res.status(201).json(content);
  } catch (error) {
    res.status(400).send(error);
  }
};

export const index = async (req, resp) => {
  try {
    const content = await User.find().exec();
    resp.json(content);
  } catch (error) {
    resp.json(error);
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
    const content = await User.findByIdAndUpdate(
      req.params.id,
      req.body
    ).exec();
    res.json(content);
  } catch (error) {
    res.status(400).send(error.message);
  }
};
export const destroy = async (req, resp) => {
  try {
    User.findByIdAndDelete(req.params.id).exec();
    resp.json();
  } catch (error) {
    resp.json(error);
  }
};
