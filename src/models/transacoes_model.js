import { Schema, model } from "mongoose";

const carteiraSchmea = new Schema(
  {
    walletFrom: {
      type: [Schema.Types.ObjectId],
      ref: "Carteira",
      required: true,
    },
    walletTo: {
      type: [Schema.Types.ObjectId],
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
      default: "withdraw",
    },
    status: {
      type: String,
      required: true,
      enum: ["completed", "pending", "failed"],
      default: "withdraw",
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

const Transacao = model("Transacao", carteiraSchmea);

export default Transacao;
