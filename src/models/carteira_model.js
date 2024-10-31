import { Schema, model } from "mongoose";

const carteiraSchmea = new Schema(
  {
    userId: {
      type: [Schema.Types.ObjectId],
      ref: "User",
      required: true,
    },

    balance: {
      type: Number,
      required: true,
      min: 0,
    },
    currency: {
      type: String,
      required: true,
      enum: ["USD", "BRL", "BTC"],
      default: "BRL",
    },
  },
  {
    timestamps: true,
  }
);

const Carteira = model("Carteira", carteiraSchmea);

export default Carteira;
