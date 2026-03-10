import { Link } from "react-router-dom"

export default function FileManagerPage() {

  function toggleTheme() {
    document.documentElement.classList.toggle("dark")
  }

  function handleAddFile() {
    console.log("Adicionar novo arquivo")
  }

  const arquivos = [
    { nome: "bhv_passe_profundidade.cpp", atualizado: "08/03/2026" },
    { nome: "planner.cpp", atualizado: "10/03/2026" },
    { nome: "strategy.cpp", atualizado: "09/03/2026" },
    { nome: "bhv_basic_move.cpp", atualizado: "05/03/2026" },
    { nome: "setplay.cpp", atualizado: "07/03/2026" },
    { nome: "setplay.h", atualizado: "07/03/2026" },
  ]

  return (
    <div className="min-h-screen p-8
      bg-white text-black
      dark:bg-neutral-950 dark:text-white">

      <div className="flex justify-between items-center mb-8">

        <div className="flex gap-4 items-center">
          <Link
            to="/chat"
            className="px-3 py-2 rounded-lg bg-neutral-200 dark:bg-neutral-800"
          >
            ← Voltar
          </Link>

          <h1 className="text-2xl font-semibold">
            Gerenciar Arquivos
          </h1>
        </div>

        <div className="flex gap-3">

          <Link
            to="/dashboard"
            className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition"
          >
            Dashboard
          </Link>

          <button
            onClick={toggleTheme}
            className="px-3 py-2 rounded-lg bg-neutral-200 dark:bg-neutral-800"
          >
            🌗
          </button>

          <Link
            to="/login"
            className="px-4 py-2 rounded-lg bg-red-600 text-white"
          >
            Logout
          </Link>

        </div>

      </div>


      {/* Botão adicionar arquivo */}
      <div className="flex justify-end mb-4">
        <button
          onClick={handleAddFile}
          className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
        >
          + Adicionar Arquivo
        </button>
      </div>


      {/* Lista de arquivos */}
      <div className="rounded-xl border
        bg-neutral-100 border-neutral-300
        dark:bg-neutral-900 dark:border-neutral-800 divide-y dark:divide-neutral-800">

        {arquivos.map((file) => (
          <div
            key={file.nome}
            className="flex justify-between items-center p-4
            hover:bg-neutral-200 dark:hover:bg-neutral-800 transition"
          >

            <div className="flex flex-col">
              <span className="font-medium">
                {file.nome}
              </span>

              <span className="text-xs text-neutral-500">
                Última modificação: {file.atualizado}
              </span>
            </div>

            <button className="px-3 py-1 rounded-lg
              bg-neutral-300 dark:bg-neutral-700 text-sm">
              Editar
            </button>

          </div>
        ))}

      </div>

    </div>
  )
}