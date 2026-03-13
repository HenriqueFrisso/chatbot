export interface RegisterData {
  matricula: string;
  nome: string;
  senha: string;
}

export interface UserResponse {
  id: number;
  matricula: string;
  nome: string;
  token?: string; // se tiver autenticação
}

export async function registerUser(data: RegisterData): Promise<UserResponse> {
  const response = await fetch("http://localhost:3000/usuarios/cadastro", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });

  const responseData = await response.json();

  if (!response.ok) {
    throw new Error(responseData.erro || "Erro ao cadastrar usuário");
  }

  return responseData;
}

export interface LoginData {
  matricula: string;
  senha: string;
}

export async function loginUser(data: LoginData) {
  const response = await fetch("http://localhost:3000/usuarios/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });

  const responseData = await response.json();

  if (!response.ok) {
    throw new Error(responseData.erro || "Matrícula ou senha inválidos");
  }

  return responseData;
}
