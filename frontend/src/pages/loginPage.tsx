import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import { loginUser } from "../services/userService"

export default function LoginPage() {
  const navigate = useNavigate()
  const [matricula, setMatricula] = useState("")
  const [senha, setSenha] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  function toggleTheme() {
    document.documentElement.classList.toggle("dark")
  }

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setError(null)

    if (!matricula || !senha) {
      setError("Preencha todos os campos")
      return
    }

    try {
      setLoading(true)
      const user = await loginUser({ matricula, senha })
      localStorage.setItem("usuario", JSON.stringify(user))
      navigate("/chat")
    } catch (err: any) {
      setError(err.message || "Erro ao conectar com o servidor")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white text-black dark:bg-neutral-950 dark:text-white transition-colors">
      <div className="absolute top-4 right-4">
        <button onClick={toggleTheme} className="px-3 py-2 rounded-lg bg-neutral-200 dark:bg-neutral-800 hover:opacity-80 transition-opacity">
          🌗
        </button>
      </div>

      <div className="w-full max-w-md p-8 rounded-2xl border shadow-lg bg-neutral-100 border-neutral-300 dark:bg-neutral-900 dark:border-neutral-800">
        <h1 className="text-2xl font-semibold mb-6 text-center">Login</h1>

        {error && (
          <div className="mb-4 p-3 rounded-lg text-sm font-medium border bg-red-100 border-red-200 text-red-700 dark:bg-red-900/30 dark:border-red-800 dark:text-red-400">
            {error}
          </div>
        )}

        <form className="space-y-4" onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Matrícula"
            value={matricula}
            onChange={(e) => setMatricula(e.target.value)}
            required
            className="w-full p-3 rounded-lg bg-neutral-200 dark:bg-neutral-800 outline-none focus:ring-2 focus:ring-green-500 transition-all placeholder:text-neutral-500"
          />
          <input
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
            className="w-full p-3 rounded-lg bg-neutral-200 dark:bg-neutral-800 outline-none focus:ring-2 focus:ring-green-500 transition-all placeholder:text-neutral-500"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-500 disabled:bg-neutral-400 dark:disabled:bg-neutral-700 p-3 rounded-lg font-medium text-white transition-colors"
          >
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </form>

        <p className="text-sm text-center mt-6 text-neutral-600 dark:text-neutral-400">
          Não possui conta?{" "}
          <Link to="/register" className="text-green-500 hover:underline font-medium">
            Cadastre-se
          </Link>
        </p>
      </div>
    </div>
  )
}
