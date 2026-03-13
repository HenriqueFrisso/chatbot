import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"

export default function RegisterPage() {
  const navigate = useNavigate()

  const [matricula, setMatricula] = useState("")
  const [nome, setNome] = useState("")
  const [senha, setSenha] = useState("")
  const [confirmarSenha, setConfirmarSenha] = useState("")
  const [loading, setLoading] = useState(false)

  function toggleTheme() {
    document.documentElement.classList.toggle("dark")
  }

  async function handleRegister(e: React.FormEvent) {
  e.preventDefault()

  if (!matricula || !nome || !senha || !confirmarSenha) {
    alert("Preencha todos os campos")
    return
  }

  if (senha !== confirmarSenha) {
    alert("As senhas não coincidem")
    return
  }

  try {
    setLoading(true)

    const response = await fetch("http://localhost:3000/usuarios/cadastro", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        matricula: matricula,
        nome: nome,
        senha: senha
      })
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.erro || "Erro ao cadastrar usuário")
    }

    alert("Usuário cadastrado com sucesso!")

    navigate("/login")

  } catch (error) {
    console.error(error)
    alert("Erro ao cadastrar usuário")
  } finally {
    setLoading(false)
  }
}


  return (
    <div className="min-h-screen flex items-center justify-center
      bg-white text-black
      dark:bg-neutral-950 dark:text-white">

      <div className="absolute top-4 right-4">
        <button
          onClick={toggleTheme}
          className="px-3 py-2 rounded-lg bg-neutral-200 dark:bg-neutral-800"
        >
          🌗
        </button>
      </div>

      <div className="w-full max-w-md p-8 rounded-2xl border shadow-lg
        bg-neutral-100 border-neutral-300
        dark:bg-neutral-900 dark:border-neutral-800">

        <h1 className="text-2xl font-semibold mb-6 text-center">
          Criar Conta
        </h1>

        <form className="space-y-4" onSubmit={handleRegister}>

          <input
            type="text"
            placeholder="Matrícula"
            value={matricula}
            onChange={(e) => setMatricula(e.target.value)}
            required
            className="w-full p-3 rounded-lg bg-neutral-200 dark:bg-neutral-800 outline-none"
          />

          <input
            type="text"
            placeholder="Nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
            className="w-full p-3 rounded-lg bg-neutral-200 dark:bg-neutral-800 outline-none"
          />

          <input
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
            className="w-full p-3 rounded-lg bg-neutral-200 dark:bg-neutral-800 outline-none"
          />

          <input
            type="password"
            placeholder="Confirmar Senha"
            value={confirmarSenha}
            onChange={(e) => setConfirmarSenha(e.target.value)}
            required
            className="w-full p-3 rounded-lg bg-neutral-200 dark:bg-neutral-800 outline-none"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-500 p-3 rounded-lg font-medium text-white"
          >
            {loading ? "Cadastrando..." : "Cadastrar"}
          </button>

        </form>

        <p className="text-sm text-center mt-6">
          Já possui conta?{" "}
          <Link to="/login" className="text-green-500 hover:underline">
            Entrar
          </Link>
        </p>

      </div>
    </div>
  )
}