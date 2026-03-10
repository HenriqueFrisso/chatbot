import { Link } from "react-router-dom"

export default function ChatPage() {
  return (
    <div className="h-screen flex
      bg-white text-black
      dark:bg-neutral-950 dark:text-white">

      {/* SIDEBAR ESQUERDA */}
      <aside className="w-60 flex flex-col border-r
        bg-neutral-100 border-neutral-300
        dark:bg-neutral-900 dark:border-neutral-800">

        <div className="p-4 border-b border-neutral-300 dark:border-neutral-800 space-y-2">
          <button className="w-full bg-neutral-200 hover:bg-neutral-300 dark:bg-neutral-800 dark:hover:bg-neutral-700 p-2 rounded-lg transition">
            + Nova conversa
          </button>

          <Link
            to="/files"
            className="block text-center bg-neutral-200 hover:bg-neutral-300 dark:bg-neutral-800 dark:hover:bg-neutral-700 p-2 rounded-lg transition text-sm"
          >
            Configurações
          </Link>
        </div>

        <div className="flex-1 overflow-y-auto p-3 space-y-2">
          <div className="p-2 rounded-lg hover:bg-neutral-200 dark:hover:bg-neutral-800 cursor-pointer transition">
            Melhora de passes
          </div>
          <div className="p-2 rounded-lg hover:bg-neutral-200 dark:hover:bg-neutral-800 cursor-pointer transition">
            Criação de jogadas
          </div>
        </div>

        <div className="p-4 border-t border-neutral-300 dark:border-neutral-800">
          <Link
            to="/login"
            className="text-sm text-red-500 hover:underline"
          >
            Sair
          </Link>
        </div>
      </aside>


      {/* CHAT CENTRAL */}
      <main className="flex-1 flex flex-col">

        <div className="p-4 border-b border-neutral-300 dark:border-neutral-800 font-semibold">
          Chat 2D
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-4 flex flex-col">

          {/* Mensagem IA */}
          <div className="bg-neutral-200 dark:bg-neutral-800 p-4 rounded-xl max-w-xl">
            Olá 👋
          </div>

          {/* Mensagem usuário */}
          <div className="bg-green-600 text-white p-4 rounded-xl max-w-xl self-end">
            Quero que me explique como funciona a decisão de passes.
          </div>

          <div className="bg-neutral-200 dark:bg-neutral-800 p-4 rounded-xl max-w-xl">
            Aqui ficaria a resposta da IA...
          </div>

        </div>

        {/* Barra de envio */}
        <div className="p-4 border-t border-neutral-300 dark:border-neutral-800">
          <div className="bg-neutral-200 dark:bg-neutral-800 rounded-xl p-3 flex items-center">
            <input
              className="flex-1 bg-transparent outline-none"
              placeholder="Digite sua mensagem..."
            />
            <button className="ml-3 bg-green-600 hover:bg-green-500 px-4 py-2 rounded-lg transition text-white">
              Enviar
            </button>
          </div>
        </div>

      </main>


      {/* PAINEL DIREITO - ARQUIVOS */}
      <aside className="w-72 flex flex-col border-l
        bg-neutral-100 border-neutral-300
        dark:bg-neutral-900 dark:border-neutral-800">

        <div className="p-4 border-b border-neutral-300 dark:border-neutral-800">
          <label className="text-sm text-neutral-500 dark:text-neutral-400 block">
            Arquivos para pesquisa
          </label>
        </div>

        <div className="flex-1 p-4 space-y-3 overflow-y-auto">
          <div className="bg-neutral-200 dark:bg-neutral-800 p-3 rounded-lg">
            📄 bhv_passe_profundidade.cpp
          </div>

          <div className="bg-neutral-200 dark:bg-neutral-800 p-3 rounded-lg">
            📄 planner.cpp
          </div>

          <div className="bg-neutral-200 dark:bg-neutral-800 p-3 rounded-lg">
            📄 strategy.cpp
          </div>
        </div>

        <div className="p-4 border-t border-neutral-300 dark:border-neutral-800">
          <label className="text-sm text-neutral-500 dark:text-neutral-400 block mb-2">
            Adicionar arquivo
          </label>
          <select className="w-full bg-neutral-200 dark:bg-neutral-800 p-2 rounded-lg outline-none">
            <option>Selecione...</option>
            <option>bhv_basic_move.cpp</option>
            <option>setplay.cpp</option>
            <option>setplay.h</option>
          </select>
        </div>

      </aside>

    </div>
  )
}