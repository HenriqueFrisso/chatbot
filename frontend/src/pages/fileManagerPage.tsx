import { Link, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import {
  cadastrarDocumento,
  listarDocumentos,
  atualizarDocumento,
  deletarDocumento,
} from "../services/documentService"
import type { DocumentoResponse } from "../services/documentService"
import { updatePassword } from "../services/userService"

export default function FileManagerPage() {
  const navigate = useNavigate()
  const [usuario, setUsuario] = useState<{ nome: string; matricula: string; id: number } | null>(null)
  const [documentos, setDocumentos] = useState<DocumentoResponse[]>([])

  // Estado do modal de redefinição de senha
  const [showModalSenha, setShowModalSenha] = useState(false)
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [recoveryMessage, setRecoveryMessage] = useState<string | null>(null)

  // Estado do modal de documento
  const [showModalDoc, setShowModalDoc] = useState(false)
  const [docTitulo, setDocTitulo] = useState("")
  const [docLinguagem, setDocLinguagem] = useState("")
  const [docConteudo, setDocConteudo] = useState("")
  const [editingDocId, setEditingDocId] = useState<number | null>(null)
  const [docMessage, setDocMessage] = useState<string | null>(null)

  // Novo estado: modo de upload (arquivo ou pasta)
  const [uploadMode, setUploadMode] = useState<"file" | "folder">("file")

  // Checa login
  useEffect(() => {
    const usuarioLogado = localStorage.getItem("usuario")
    if (usuarioLogado) {
      const u = JSON.parse(usuarioLogado)
      setUsuario(u)
      carregarDocumentos(u.id)
    } else {
      navigate("/login")
    }
  }, [])

  async function carregarDocumentos(idusuario: number) {
    try {
      const docs = await listarDocumentos(idusuario)
      setDocumentos(docs)
    } catch (err: any) {
      console.error(err)
    }
  }

  function toggleTheme() {
    document.documentElement.classList.toggle("dark")
  }

  function handleLogout() {
    localStorage.removeItem("usuario")
    navigate("/login")
  }

  function abrirModalDoc(doc?: DocumentoResponse) {
    if (doc) {
      setEditingDocId(doc.iddocumento)
      setDocTitulo(doc.titulo)
      setDocLinguagem(doc.linguagem)
      setDocConteudo(doc.conteudo)
    } else {
      setEditingDocId(null)
      setDocTitulo("")
      setDocLinguagem("")
      setDocConteudo("")
    }
    setDocMessage(null)
    setShowModalDoc(true)
  }

  function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    setDocTitulo(file.name.replace(/\.[^/.]+$/, ""))
    setDocLinguagem(file.name.split(".").pop() || "")

    const reader = new FileReader()
    reader.onload = (event) => {
      const text = event.target?.result
      if (typeof text === "string") {
        setDocConteudo(text)
      }
    }
    reader.readAsText(file)
  }

  function handleFolderUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files
    if (!files || !usuario) return

    Array.from(files).forEach(file => {
      const reader = new FileReader()
      reader.onload = (event) => {
        const content = event.target?.result
        if (typeof content === "string") {
          cadastrarDocumento({
            titulo: file.name.replace(/\.[^/.]+$/, ""),
            linguagem: file.name.split(".").pop() || "",
            conteudo: content,
            idusuario: usuario.id,
          }).then(() => carregarDocumentos(usuario.id))
            .catch(err => console.error(err))
        }
      }
      reader.readAsText(file)
    })
  }

  async function salvarDocumento() {
    if (!usuario) return

    try {
      if (editingDocId) {
        await atualizarDocumento(editingDocId, {
          titulo: docTitulo,
          linguagem: docLinguagem,
          conteudo: docConteudo,
        })
      } else {
        await cadastrarDocumento({
          titulo: docTitulo,
          linguagem: docLinguagem,
          conteudo: docConteudo,
          idusuario: usuario.id,
        })
      }
      setShowModalDoc(false)
      carregarDocumentos(usuario.id)
    } catch (err: any) {
      setDocMessage(err.message || "Erro ao salvar documento")
    }
  }

  async function removerDocumento(id: number) {
    if (!usuario) return
    try {
      await deletarDocumento(id)
      carregarDocumentos(usuario.id)
    } catch (err: any) {
      console.error(err)
    }
  }

  return (
    <div className="min-h-screen p-8 bg-white text-black dark:bg-neutral-950 dark:text-white">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-8">
        <div className="flex gap-4 items-center">
          <Link to="/chat" className="px-3 py-2 rounded-lg bg-neutral-200 dark:bg-neutral-800">← Voltar</Link>
          <h1 className="text-2xl font-semibold">
            Gerenciar Arquivos {usuario && <span className="font-medium">de {usuario.nome}</span>}
          </h1>
        </div>

        <div className="flex gap-3 items-center">
          <button onClick={() => setShowModalSenha(true)} className="px-4 py-2 rounded-lg bg-yellow-500 text-white hover:bg-yellow-400 transition">Redefinir Senha</button>
          <Link to="/dashboard" className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition">Dashboard</Link>
          <button onClick={toggleTheme} className="px-3 py-2 rounded-lg bg-neutral-200 dark:bg-neutral-800">🌗</button>
          <button onClick={handleLogout} className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-500 transition">Logout</button>
        </div>
      </div>

      {/* Botão adicionar arquivo */}
      <div className="flex justify-end mb-4">
        <button onClick={() => abrirModalDoc()} className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition">+ Adicionar Arquivo</button>
      </div>

      {/* Lista de documentos */}
      <div className=" overflow-y-auto max-h-[680px] rounded-xl border bg-neutral-100 border-neutral-300 dark:bg-neutral-900 dark:border-neutral-800 divide-y dark:divide-neutral-800">
        {documentos.map((doc) => (
          <div key={doc.iddocumento} className="flex justify-between items-center p-4 hover:bg-neutral-200 dark:hover:bg-neutral-800 transition">
            <div className="flex flex-col">
              <span className="font-medium">{doc.titulo}.{doc.linguagem}</span>
              <span className="text-xs text-neutral-500">Última modificação:  {doc.data_att.split("T")[0]}</span>
            </div>
            <div className="flex gap-2">
              <button onClick={() => abrirModalDoc(doc)} className="px-3 py-1 rounded-lg bg-neutral-300 dark:bg-neutral-700 text-sm">Editar</button>
              <button onClick={() => removerDocumento(doc.iddocumento)} className="px-3 py-1 rounded-lg bg-red-500 text-sm text-white">Deletar</button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Redefinir Senha */}
      {showModalSenha && usuario && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-neutral-900 p-6 rounded-xl w-full max-w-sm shadow-lg relative">
            <button onClick={() => setShowModalSenha(false)} className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">✖</button>
            <h2 className="text-xl font-semibold mb-4 text-center">Redefinir senha</h2>
            {recoveryMessage && <div className="mb-4 p-2 rounded bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 text-sm text-center">{recoveryMessage}</div>}
            <form onSubmit={async (e) => {
              e.preventDefault()
              setRecoveryMessage(null)
              if (!newPassword || !confirmPassword) return setRecoveryMessage("Preencha todos os campos")
              if (newPassword !== confirmPassword) return setRecoveryMessage("As senhas não coincidem")
              try { await updatePassword(usuario.matricula, newPassword); setShowModalSenha(false); setNewPassword(""); setConfirmPassword(""); } 
              catch (err: any) { setRecoveryMessage(err.message || "Erro ao atualizar a senha") }
            }} className="space-y-4">
              <input type="password" placeholder="Nova senha" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="w-full p-3 rounded-lg bg-neutral-200 dark:bg-neutral-800 outline-none focus:ring-2 focus:ring-green-500 transition-all" />
              <input type="password" placeholder="Confirme a nova senha" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="w-full p-3 rounded-lg bg-neutral-200 dark:bg-neutral-800 outline-none focus:ring-2 focus:ring-green-500 transition-all" />
              <button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 p-3 rounded-lg font-medium text-white transition-colors">Atualizar senha</button>
            </form>
          </div>
        </div>
      )}

      {/* Modal Criar/Editar Documento via Upload */}
      {showModalDoc && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-neutral-900 p-6 rounded-xl w-full max-w-md shadow-lg relative">
            <button
              onClick={() => setShowModalDoc(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
            >
              ✖
            </button>

            <h2 className="text-xl font-semibold mb-4 text-center">
              {editingDocId ? "Editar Documento" : "Novo Documento"}
            </h2>

            {docMessage && (
              <div className="mb-4 p-2 rounded bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 text-sm text-center">
                {docMessage}
              </div>
            )}

            <div className="space-y-4">
              {/* Radio Buttons para alternar upload */}
              <div className="flex gap-4 items-center">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="uploadMode"
                    value="file"
                    checked={uploadMode === "file"}
                    onChange={() => setUploadMode("file")}
                  />
                  Arquivo
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="uploadMode"
                    value="folder"
                    checked={uploadMode === "folder"}
                    onChange={() => setUploadMode("folder")}
                  />
                  Pasta
                </label>
              </div>

              {/* Input de upload */}
              {uploadMode === "file" ? (
                <input
                  type="file"
                  accept=".cpp,.h,.js,.ts,.py,.java,.txt,.in,.sh"
                  onChange={handleFileUpload}
                  className="w-full p-3 rounded-lg bg-neutral-200 dark:bg-neutral-800 outline-none"
                />
              ) : (
                <input
                  type="file"
                  multiple
                  accept=".cpp,.h,.js,.ts,.py,.java,.txt,.in,.sh"
                  onChange={handleFolderUpload}
                  className="w-full p-3 rounded-lg bg-neutral-200 dark:bg-neutral-800 outline-none"
                  {...({ webkitdirectory: "true" } as any)}
                />
              )}

              {/* Campos preenchidos automaticamente e imutáveis */}
              <input
                type="text"
                placeholder="Título"
                value={docTitulo}
                readOnly
                className="w-full p-3 rounded-lg bg-neutral-300 dark:bg-neutral-700 outline-none"
              />
              <input
                type="text"
                placeholder="Linguagem"
                value={docLinguagem}
                readOnly
                className="w-full p-3 rounded-lg bg-neutral-300 dark:bg-neutral-700 outline-none"
              />
              <textarea
                placeholder="Conteúdo"
                value={docConteudo}
                readOnly
                className="w-full p-3 rounded-lg bg-neutral-300 dark:bg-neutral-700 outline-none h-40"
              />

              <button
                onClick={salvarDocumento}
                className="w-full bg-green-600 hover:bg-green-500 p-3 rounded-lg font-medium text-white transition-colors"
              >
                {editingDocId ? "Atualizar" : "Cadastrar"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}