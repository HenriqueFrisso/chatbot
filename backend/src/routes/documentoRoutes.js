import express from "express";
import * as documentoController from "../controllers/documentoController.js";

const router = express.Router();

router.post("/", documentoController.cadastrar);
router.get("/:idusuario", documentoController.listar);
router.get("/doc/:iddocumento", documentoController.buscar);
router.put("/:iddocumento", documentoController.atualizar);
router.delete("/:iddocumento", documentoController.deletar);

export default router;