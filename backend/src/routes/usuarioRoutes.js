import express from "express";
import * as usuarioController from "../controllers/usuarioController.js";

const router = express.Router();

// Rota de login
router.post("/login", usuarioController.login);

// Rota de cadastro
router.post("/cadastro", usuarioController.cadastrar);

// Rota de redefinir senha
router.put("/redefinir-senha", usuarioController.redefinirSenha);

export default router;