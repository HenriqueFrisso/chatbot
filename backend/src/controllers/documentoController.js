import * as documentoService from "../services/documentoService.js";

export async function cadastrar(req, res) {
  const { titulo, linguagem, conteudo, idusuario } = req.body;
  if (!titulo || !linguagem || !conteudo || !idusuario) {
    return res.status(400).json({ erro: "Todos os campos são obrigatórios" });
  }

  try {
    const id = await documentoService.cadastrarDocumento({ titulo, linguagem, conteudo, idusuario });
    res.status(201).json({ message: "Documento cadastrado com sucesso", id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: "Erro ao cadastrar documento" });
  }
}

export async function listar(req, res) {
  const { idusuario } = req.params;

  try {
    const documentos = await documentoService.listarDocumentos(idusuario);
    res.json(documentos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: "Erro ao listar documentos" });
  }
}

export async function atualizar(req, res) {
  const { iddocumento } = req.params;
  const { titulo, linguagem, conteudo } = req.body;

  try {
    await documentoService.atualizarDocumento(iddocumento, { titulo, linguagem, conteudo });
    res.json({ message: "Documento atualizado com sucesso" });
  } catch (error) {
    console.error(error);
    res.status(404).json({ erro: error.message });
  }
}

export async function deletar(req, res) {
  const { iddocumento } = req.params;

  try {
    await documentoService.deletarDocumento(iddocumento);
    res.json({ message: "Documento deletado com sucesso" });
  } catch (error) {
    console.error(error);
    res.status(404).json({ erro: error.message });
  }
}

export async function buscar(req, res) {
  const { iddocumento } = req.params;

  try {
    const doc = await documentoService.buscarDocumento(iddocumento);
    res.json(doc);
  } catch (error) {
    console.error(error);
    res.status(404).json({ erro: error.message });
  }
}