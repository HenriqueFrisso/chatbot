import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import { registerUser } from "../services/userService"

export default function RegisterPage() {
  const navigate = useNavigate()

  const [matricula, setMatricula] = useState("")
  const [nome, setNome] = useState("")
  const [senha, setSenha] = useState("")
  const [confirmarSenha, setConfirmarSenha] = useState("")
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState<{ type: 'error' | 'success', message: string } | null>(null)

  function toggleTheme() {
    document.documentElement.classList.toggle("dark")
  }

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault()
    setStatus(null)

    if (!matricula || !nome || !senha || !confirmarSenha) {
      setStatus({ type: 'error', message: "Preencha todos os campos" })
      return
    }

    if (senha !== confirmarSenha) {
      setStatus({ type: 'error', message: "As senhas não coincidem" })
      return
    }

    try {
      setLoading(true)

      const user = await registerUser({ matricula, nome, senha })

      // Login direto
      localStorage.setItem("usuario", JSON.stringify(user))
      setStatus({ type: 'success', message: "Cadastro realizado! Entrando..." })
      
      setTimeout(() => navigate("/chat"), 1000)

    } catch (error: any) {
      setStatus({ type: 'error', message: error.message || "Erro ao conectar com o servidor" })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white text-black dark:bg-neutral-950 dark:text-white transition-colors">
      <div className="absolute top-4 right-4">
        <button onClick={toggleTheme} className="px-3 py-2 rounded-lg bg-neutral-200 dark:bg-neutral-800">
          🌗
        </button>
      </div>

      <div className="w-full max-w-md p-8 rounded-2xl border shadow-lg bg-neutral-100 border-neutral-300 dark:bg-neutral-900 dark:border-neutral-800">
        <h1 className="text-2xl font-semibold mb-6 text-center">Criar Conta</h1>

        {status && (
          <div className={`mb-4 p-3 rounded-lg text-sm font-medium border ${status.type === 'error' 
            ? 'bg-red-100 border-red-200 text-red-700 dark:bg-red-900/30 dark:border-red-800 dark:text-red-400' 
            : 'bg-green-100 border-green-200 text-green-700 dark:bg-green-900/30 dark:border-green-800 dark:text-green-400'}`}>
            {status.message}
          </div>
        )}

        <form className="space-y-4" onSubmit={handleRegister}>
          <input
            type="text" placeholder="Matrícula" value={matricula}
            onChange={(e) => setMatricula(e.target.value)}
            className="w-full p-3 rounded-lg bg-neutral-200 dark:bg-neutral-800 outline-none focus:ring-2 focus:ring-green-500 transition-all"
          />
          <input
            type="text" placeholder="Nome" value={nome}
            onChange={(e) => setNome(e.target.value)}
            className="w-full p-3 rounded-lg bg-neutral-200 dark:bg-neutral-800 outline-none focus:ring-2 focus:ring-green-500 transition-all"
          />
          <input
            type="password" placeholder="Senha" value={senha}
            onChange={(e) => setSenha(e.target.value)}
            className="w-full p-3 rounded-lg bg-neutral-200 dark:bg-neutral-800 outline-none focus:ring-2 focus:ring-green-500 transition-all"
          />
          <input
            type="password" placeholder="Confirmar Senha" value={confirmarSenha}
            onChange={(e) => setConfirmarSenha(e.target.value)}
            className="w-full p-3 rounded-lg bg-neutral-200 dark:bg-neutral-800 outline-none focus:ring-2 focus:ring-green-500 transition-all"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-500 disabled:bg-neutral-500 p-3 rounded-lg font-medium text-white transition-colors"
          >
            {loading ? "Cadastrando..." : "Cadastrar e Entrar"}
          </button>
        </form>

        <p className="text-sm text-center mt-6">
          Já possui conta? <Link to="/login" className="text-green-500 hover:underline">Entrar</Link>
        </p>
      </div>
    </div>
  )
}
