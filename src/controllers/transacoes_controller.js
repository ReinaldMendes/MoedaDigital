import transacao from "../models/transacoes_model.js";
import carteira from "../models/carteira_model.js";

export const store = async (req, resp) => {
  try {
    const { walletFrom, walletTo, amount, typeTransition } = req.body;

    // Verifica se a transação é uma transferência
    if (typeTransition === "transfer") {
      // Encontra as carteiras envolvidas
      const fromWallet = await carteira.findById(walletFrom);
      const toWallet = await carteira.findById(walletTo);

      // Verifica se a carteira de origem tem saldo suficiente
      if (fromWallet.balance < amount) {
        return resp.status(400).json({ error: "Saldo insuficiente." });
      }

      // Atualiza os saldos das carteiras
      fromWallet.balance -= amount; // Diminui o saldo da carteira de origem
      toWallet.balance += amount; // Aumenta o saldo da carteira de destino

      await fromWallet.save(); // Salva as alterações da carteira de origem
      await toWallet.save(); // Salva as alterações da carteira de destino
    }

    // Cria a transação
    const content = await transacao.create(req.body);
    resp.status(201).json(content);
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
      .populate(["walletFrom", "walletTo"]) // Popula as carteiras associadas
      .exec();
    resp.json(content);
  } catch (error) {
    resp.status(400).json(error);
  }
};

export const update = async (req, res) => {
  try {
    const content = await transacao
      .findByIdAndUpdate(req.params.id, req.body, { new: true }) // Retorna a transação atualizada
      .exec();
    res.json(content);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export const destroy = async (req, resp) => {
  try {
    await transacao.findByIdAndDelete(req.params.id).exec();
    resp.status(204).json(); // Retorna status 204 sem conteúdo
  } catch (error) {
    resp.status(400).json(error);
  }
};
