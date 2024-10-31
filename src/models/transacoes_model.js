import { Schema, model } from "mongoose";

const transacaoSchema = new Schema(
  {
    walletFrom: {
      type: Schema.Types.ObjectId,  // Correção para um único ObjectId
      ref: "Carteira",
      required: true,
    },
    walletTo: {
      type: Schema.Types.ObjectId,  // Correção para um único ObjectId
      ref: "Carteira",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
    typeTransition: {
      type: String,
      required: true,
      enum: ["transfer", "deposit", "withdraw"],
      default: "transfer",  // Valor padrão mais adequado
    },
    status: {
      type: String,
      required: true,
      enum: ["completed", "pending", "failed"],
      default: "pending",  // Valor padrão mais adequado para início de uma transação
    },
    currency: {
      type: String,
      required: true,
      enum: ["USD", "BRL", "BTC"],
      default: "BRL",
    },
    details: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const Transacao = model("Transacao", transacaoSchema);

export default Transacao;
