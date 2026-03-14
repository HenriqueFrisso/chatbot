// validação, regras de negócio e hash de senha
import * as usuarioRepository from "../repositories/usuarioRepository.js";
import bcrypt from "bcryptjs";

export async function cadastrar(usuario) {
  const existingUser = await usuarioRepository.buscarPorMatricula(usuario.matricula);
  if (existingUser) {
    throw new Error("Essa matrícula já está cadastrada");
  }

  const senhaHash = await bcrypt.hash(usuario.senha, 10);
  return usuarioRepository.criarUsuario({ ...usuario, senha: senhaHash });
}

export async function login(matricula, senha) {
  const usuario = await usuarioRepository.buscarPorMatricula(matricula);
  if (!usuario) throw new Error("Usuário não encontrado");

  const senhaValida = await bcrypt.compare(senha, usuario.senha);
  if (!senhaValida) throw new Error("Senha incorreta");

  return usuario;
}

export async function redefinirSenha(matricula, novaSenha) {
  const usuario = await usuarioRepository.buscarPorMatricula(matricula);
  if (!usuario) throw new Error("Matrícula não encontrada");

  const senhaHash = await bcrypt.hash(novaSenha, 10);
  return usuarioRepository.atualizarSenha(matricula, senhaHash);
}