// recebe requisições HTTP
import * as usuarioService from "../services/usuarioService.js";

export async function cadastrar(req, res) {
  const { matricula, nome, senha } = req.body;
  if (!matricula || !nome || !senha) {
    return res.status(400).json({ erro: "Todos os campos são obrigatórios" });
  }

  try {
    const result = await usuarioService.cadastrar({ matricula, nome, senha });
    res.status(201).json({
      message: "Usuário cadastrado com sucesso",
      id: result.insertId,
      matricula,
      nome
    });
  } catch (err) {
    if (err.message.includes("cadastrada")) {
      return res.status(409).json({ erro: err.message });
    }
    console.error(err);
    res.status(500).json({ erro: "Não foi possível cadastrar usuário" });
  }
}

export async function login(req, res) {
  const { matricula, senha } = req.body;
  if (!matricula || !senha) {
    return res.status(400).json({ erro: "Matrícula e senha são obrigatórios" });
  }

  try {
    const usuario = await usuarioService.login(matricula, senha);
    res.json({
      id: usuario.idusuario,
      matricula: usuario.matricula,
      nome: usuario.nome,
      message: "Login realizado com sucesso"
    });
  } catch (err) {
    if (err.message === "Usuário não encontrado" || err.message === "Senha incorreta") {
      return res.status(401).json({ erro: err.message });
    }
    console.error(err);
    res.status(500).json({ erro: "Erro ao tentar realizar login" });
  }
}

export async function redefinirSenha(req, res) {
  const { matricula, senha } = req.body;
  if (!matricula || !senha) {
    return res.status(400).json({ erro: "Matrícula e senha são obrigatórios" });
  }

  try {
    await usuarioService.redefinirSenha(matricula, senha);
    res.json({ message: "Senha atualizada com sucesso!" });
  } catch (err) {
    if (err.message === "Matrícula não encontrada") {
      return res.status(404).json({ erro: err.message });
    }
    console.error(err);
    res.status(500).json({ erro: "Erro ao atualizar a senha" });
  }
}