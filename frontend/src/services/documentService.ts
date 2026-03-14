export interface DocumentoData {
  titulo: string;
  linguagem: string;
  conteudo: string;
  idusuario: number;
}

export interface DocumentoResponse {
  iddocumento: number;
  titulo: string;
  linguagem: string;
  conteudo: string;
  data_att: string;
  idusuario: number;
}

// Cadastrar um novo documento
export async function cadastrarDocumento(data: DocumentoData): Promise<{ message: string; id: number }> {
  const response = await fetch("http://localhost:3000/documentos", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const responseData = await response.json();

  if (!response.ok) {
    throw new Error(responseData.erro || "Erro ao cadastrar documento");
  }

  return responseData;
}

// Listar documentos de um usuário
export async function listarDocumentos(idusuario: number): Promise<DocumentoResponse[]> {
  const response = await fetch(`http://localhost:3000/documentos/${idusuario}`);
  const responseData = await response.json();

  if (!response.ok) {
    throw new Error(responseData.erro || "Erro ao listar documentos");
  }

  return responseData;
}

// Buscar um documento específico
export async function buscarDocumento(iddocumento: number): Promise<DocumentoResponse> {
  const response = await fetch(`http://localhost:3000/documentos/doc/${iddocumento}`);
  const responseData = await response.json();

  if (!response.ok) {
    throw new Error(responseData.erro || "Documento não encontrado");
  }

  return responseData;
}

// Atualizar documento
export async function atualizarDocumento(iddocumento: number, data: Partial<DocumentoData>): Promise<{ message: string }> {
  const response = await fetch(`http://localhost:3000/documentos/${iddocumento}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const responseData = await response.json();

  if (!response.ok) {
    throw new Error(responseData.erro || "Erro ao atualizar documento");
  }

  return responseData;
}

// Deletar documento
export async function deletarDocumento(iddocumento: number): Promise<{ message: string }> {
  const response = await fetch(`http://localhost:3000/documentos/${iddocumento}`, {
    method: "DELETE",
  });

  const responseData = await response.json();

  if (!response.ok) {
    throw new Error(responseData.erro || "Erro ao deletar documento");
  }

  return responseData;
}