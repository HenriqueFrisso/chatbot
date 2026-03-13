import { db } from "../config/database.js";

export async function criarUsuario(usuario) {
  const { idusuario, matricula, nome, senha } = usuario;

  await db.query(
    "INSERT INTO usuario VALUES (?, ?, ?, ?)",
    [idusuario, matricula, nome, senha]
  );
}
