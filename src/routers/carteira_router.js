import { Router } from "express";
import {
  store,
  index,
  show,
  update,
  destroy,
  getBalance,
} from "../controllers/carteira_controller.js";
import jwtAuthenticator from "../middlewares/jwt-autenticator.js"; // Middleware para autenticação JWT
import authorizer from "../middlewares/authorizer.js"; // Middleware para autorização por role

const router = Router();

// Middleware para autenticação e autorização
router.use(jwtAuthenticator);
router.use(authorizer("ADMINISTRATOR", "SUPPORT"));

// Rota para obter o saldo de um usuário autenticado
router.get("/balance/:userId", getBalance); // agora protegida pelo jwtAuthenticator e authorizer

// Rotas da carteira
router.get("/", index); // Listar todas as carteiras
router.get("/:id", show); // Exibir uma carteira específica pelo ID
router.post("/", store); // Criar carteira
router.put("/:id", update); // Atualizar carteira
router.delete("/:id", destroy); // Deletar carteira

export default router;
