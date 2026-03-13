import * as usuarioRepository from "../repositories/usuarioRepository.js";

export async function cadastrar(usuario) {
  await usuarioRepository.criarUsuario(usuario);
}
