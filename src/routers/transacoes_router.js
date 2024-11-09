import { Router } from "express";
import {
  store,
  index,
  show,
  update,
  destroy,
} from "../controllers/transacoes_controller.js";
import jwtAuthenticator from "../middlewares/jwt-autenticator.js"; // Middleware para autenticação JWT
import authorizer from "../middlewares/authorizer.js"; // Middleware para autorização por role

const router = Router();

// router.use(jwtAuthenticator);
// router.use(authorizer("ADMINISTRATOR", "SUPORT"));

// Listar todas as transações
router.get("/", index);

// Obter uma transação específica pelo ID
router.get("/:id", show);

// Criar uma nova transação
router.post("/", store);

// Atualizar uma transação existente
router.put("/:id", update);

// Excluir uma transação
router.delete("/:id", destroy);

export default router;
