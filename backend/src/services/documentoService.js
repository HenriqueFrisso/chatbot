import * as documentoRepository from "../repositories/documentoRepository.js";

// Lista de extensões permitidas
const EXTENSOES_PERMITIDAS = ["cpp", "h", "js", "ts", "py", "java", "txt", "in", "sh"];

export async function cadastrarDocumento(documento) {
  const { titulo, linguagem, idusuario } = documento;

  // Valida extensão
  if (!EXTENSOES_PERMITIDAS.includes(linguagem.toLowerCase())) {
    throw new Error(`Extensão .${linguagem} não permitida. Apenas: ${EXTENSOES_PERMITIDAS.join(", ")}`);
  }

  // Verifica se já existe documento com mesmo título e linguagem
  const documentosExistentes = await documentoRepository.listarDocumentosPorUsuario(idusuario);
  const docExistente = documentosExistentes.find(
    (d) => d.titulo === titulo && d.linguagem === linguagem
  );

  if (docExistente) {
    // Substitui o documento existente
    await documentoRepository.atualizarDocumento(docExistente.iddocumento, documento);
    return docExistente.iddocumento;
  } else {
    // Cria um novo documento
    return await documentoRepository.criarDocumento(documento);
  }
}

export async function listarDocumentos(idusuario) {
  return await documentoRepository.listarDocumentosPorUsuario(idusuario);
}

export async function atualizarDocumento(iddocumento, dados) {
  const { linguagem } = dados;

  // Valida extensão ao atualizar
  if (linguagem && !EXTENSOES_PERMITIDAS.includes(linguagem.toLowerCase())) {
    throw new Error(`Extensão .${linguagem} não permitida. Apenas: ${EXTENSOES_PERMITIDAS.join(", ")}`);
  }

  const linhasAfetadas = await documentoRepository.atualizarDocumento(iddocumento, dados);
  if (linhasAfetadas === 0) throw new Error("Documento não encontrado");
  return true;
}

export async function deletarDocumento(iddocumento) {
  const linhasAfetadas = await documentoRepository.deletarDocumento(iddocumento);
  if (linhasAfetadas === 0) throw new Error("Documento não encontrado");
  return true;
}

export async function buscarDocumento(iddocumento) {
  const doc = await documentoRepository.buscarDocumentoPorId(iddocumento);
  if (!doc) throw new Error("Documento não encontrado");
  return doc;
}