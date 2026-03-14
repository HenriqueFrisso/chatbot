// apenas interação com banco
import { getDB } from "../config/database.js";

export async function criarUsuario(usuario) {
  const { matricula, nome, senha } = usuario;
  const db = await getDB();

  const [result] = await db.query(
    "INSERT INTO usuario (matricula, nome, senha) VALUES (?, ?, ?)",
    [matricula, nome, senha]
  );

  return result;
}

export async function buscarPorMatricula(matricula) {
  const db = await getDB();
  const [rows] = await db.query(
    "SELECT * FROM usuario WHERE matricula = ?",
    [matricula]
  );

  return rows[0] || null;
}

export async function atualizarSenha(matricula, senhaHash) {
  const db = await getDB();
  const [result] = await db.query(
    "UPDATE usuario SET senha = ? WHERE matricula = ?",
    [senhaHash, matricula]
  );
  return result;
}