import { Link, useNavigate } from "react-router-dom"

export default function LoginPage() {
  const navigate = useNavigate()

  function toggleTheme() {
    document.documentElement.classList.toggle("dark")
  }

  function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    navigate("/chat")
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
          Login
        </h1>

        <form className="space-y-4" onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Matrícula"
            className="w-full p-3 rounded-lg bg-neutral-200 dark:bg-neutral-800 outline-none"
          />

          <input
            type="password"
            placeholder="Senha"
            className="w-full p-3 rounded-lg bg-neutral-200 dark:bg-neutral-800 outline-none"
          />

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-500 p-3 rounded-lg font-medium text-white"
          >
            Entrar
          </button>
        </form>

        <p className="text-sm text-center mt-6">
          Não possui conta?{" "}
          <Link to="/register" className="text-green-500 hover:underline">
            Cadastre-se
          </Link>
        </p>
      </div>
    </div>
  )
}