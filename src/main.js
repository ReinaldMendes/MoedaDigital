import e from "express";
import "dotenv/config";
import "./config/db.js";
import carteira_router from "./routers/carteira_router.js";
import user_router from "./routers/usuario_router.js";
import transacao_router from "./routers/transacoes_router.js";
const app = e();
app.use(e.json());
app.use("/carteira", carteira_router);
app.use("/user", user_router);
app.use("/transaction", transacao_router);

app.listen(process.env.API_PORT, () => console.log("Server Running"));
