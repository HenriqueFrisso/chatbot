import { getDB } from "../config/database.js";

export async function criarDocumento(documento) {
  const { titulo, linguagem, conteudo, idusuario } = documento;
  const db = await getDB();

  const [result] = await db.query(
    `INSERT INTO documento (titulo, linguagem, conteudo, data_att, idusuario)
     VALUES (?, ?, ?, CURDATE(), ?)`,
    [titulo, linguagem, conteudo, idusuario]
  );

  return result.insertId;
}

export async function listarDocumentosPorUsuario(idusuario) {
  const db = await getDB();
  const [rows] = await db.query(
    "SELECT * FROM documento WHERE idusuario = ? ORDER BY data_att DESC",
    [idusuario]
  );
  return rows;
}

export async function atualizarDocumento(iddocumento, dados) {
  const { titulo, linguagem, conteudo } = dados;
  const db = await getDB();

  const [result] = await db.query(
    `UPDATE documento
     SET titulo = ?, linguagem = ?, conteudo = ?, data_att = CURDATE()
     WHERE iddocumento = ?`,
    [titulo, linguagem, conteudo, iddocumento]
  );

  return result.affectedRows;
}

export async function deletarDocumento(iddocumento) {
  const db = await getDB();

  const [result] = await db.query(
    "DELETE FROM documento WHERE iddocumento = ?",
    [iddocumento]
  );

  return result.affectedRows;
}

export async function buscarDocumentoPorId(iddocumento) {
  const db = await getDB();
  const [rows] = await db.query(
    "SELECT * FROM documento WHERE iddocumento = ?",
    [iddocumento]
  );
  return rows[0];
}