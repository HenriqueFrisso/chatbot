import { db } from "../config/database.js";
import bcrypt from "bcryptjs";

/**
 * Cadastro de usuário
 */
export async function cadastrar(req, res) {
  const { matricula, nome, senha } = req.body;

  if (!matricula || !nome || !senha) {
    return res.status(400).json({ erro: "Todos os campos são obrigatórios" });
  }

  try {
    // Gera hash da senha
    const senhaHash = await bcrypt.hash(senha, 10);

    // Insere no banco
    const [result] = await db.query(
      "INSERT INTO usuario (matricula, nome, senha) VALUES (?, ?, ?)",
      [matricula, nome, senhaHash]
    );

    res.status(201).json({
      message: "Usuário cadastrado com sucesso",
      id: result.insertId,
      matricula,
      nome
    });

  } catch (error) {
    console.error("Erro ao cadastrar usuário:", error);
    // Se a matrícula já existir
    if (error.code === "ER_DUP_ENTRY") {
      return res.status(409).json({ erro: "Matrícula já cadastrada" });
    }
    res.status(500).json({ erro: "Erro ao cadastrar usuário" });
  }
}

/**
 * Login de usuário
 */
export async function login(req, res) {
  const { matricula, senha } = req.body;

  if (!matricula || !senha) {
    return res.status(400).json({ erro: "Matrícula e senha são obrigatórios" });
  }

  try {
    // Busca usuário pelo login
    const [rows] = await db.query(
      "SELECT * FROM usuario WHERE matricula = ?",
      [matricula]
    );

    if (rows.length === 0) {
      return res.status(401).json({ erro: "Usuário não encontrado" });
    }

    const usuario = rows[0];

    // Verifica a senha
    const senhaValida = await bcrypt.compare(senha, usuario.senha);
    if (!senhaValida) {
      return res.status(401).json({ erro: "Senha incorreta" });
    }

    // Retorna dados do usuário (não retorna senha!)
    res.json({
      id: usuario.idusuario,
      matricula: usuario.matricula,
      nome: usuario.nome,
      message: "Login realizado com sucesso"
    });

  } catch (error) {
    console.error("Erro no login:", error);
    res.status(500).json({ erro: "Erro no login" });
  }
}
