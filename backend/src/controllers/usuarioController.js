import { db } from "../config/database.js";
import bcrypt from "bcryptjs";

/**
 * Cadastro de usuário
 */
export async function cadastrar(req, res) {
  const { matricula, nome, senha } = req.body;

  // Validação básica
  if (!matricula || !nome || !senha) {
    return res.status(400).json({ erro: "Todos os campos são obrigatórios" });
  }

  try {
    // Cria hash da senha
    const senhaHash = await bcrypt.hash(senha, 10);

    // Tenta inserir no banco
    const [result] = await db.query(
      "INSERT INTO usuario (matricula, nome, senha) VALUES (?, ?, ?)",
      [matricula, nome, senhaHash]
    );

    // Sucesso
    res.status(201).json({
      message: "Usuário cadastrado com sucesso",
      id: result.insertId,
      matricula,
      nome
    });

  } catch (error) {
    console.error("Erro ao cadastrar usuário:", error);

    // Se matrícula já existe
    if (error.code === "ER_DUP_ENTRY") {
      return res.status(409).json({ erro: "Essa matrícula já está cadastrada" });
    }

    // Erro inesperado
    res.status(500).json({ erro: "Não foi possível cadastrar usuário. Tente novamente mais tarde." });
  }
}

/**
 * Login de usuário
 */
export async function login(req, res) {
  const { matricula, senha } = req.body;

  // Validação básica
  if (!matricula || !senha) {
    return res.status(400).json({ erro: "Matrícula e senha são obrigatórios" });
  }

  try {
    // Busca usuário pelo login
    const [rows] = await db.query(
      "SELECT * FROM usuario WHERE matricula = ?",
      [matricula]
    );

    // Usuário não encontrado
    if (rows.length === 0) {
      return res.status(401).json({ erro: "Usuário não encontrado. Verifique a matrícula." });
    }

    const usuario = rows[0];

    // Verifica senha
    const senhaValida = await bcrypt.compare(senha, usuario.senha);
    if (!senhaValida) {
      return res.status(401).json({ erro: "Senha incorreta. Tente novamente." });
    }

    // Login bem-sucedido
    res.json({
      id: usuario.idusuario,
      matricula: usuario.matricula,
      nome: usuario.nome,
      message: "Login realizado com sucesso"
    });

  } catch (error) {
    console.error("Erro no login:", error);
    res.status(500).json({ erro: "Ocorreu um erro ao tentar realizar login. Tente novamente mais tarde." });
  }
}
