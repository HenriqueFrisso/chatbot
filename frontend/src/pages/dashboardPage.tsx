import { Link, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"

export default function DashboardPage() {
  const navigate = useNavigate()
  const [usuario, setUsuario] = useState<{ nome: string } | null>(null)

  // Carrega usuário do localStorage ao montar
  useEffect(() => {
    const usuarioLogado = localStorage.getItem("usuario")
    if (usuarioLogado) {
      setUsuario(JSON.parse(usuarioLogado))
    } else {
      navigate("/login") // redireciona se não estiver logado
    }
  }, [])

  function handleLogout() {
    localStorage.removeItem("usuario")
    navigate("/login")
  }

  // Dados simulados (depois virão da API)
  const perguntasPorDia = [
    { dia: "Seg", perguntas: 120 },
    { dia: "Ter", perguntas: 98 },
    { dia: "Qua", perguntas: 150 },
    { dia: "Qui", perguntas: 170 },
    { dia: "Sex", perguntas: 210 },
    { dia: "Sab", perguntas: 80 },
    { dia: "Dom", perguntas: 60 },
  ]

  const arquivosUsados = [
    { name: "planner.cpp", value: 320 },
    { name: "strategy.cpp", value: 250 },
    { name: "bhv_passe_profundidade.cpp", value: 180 },
    { name: "setplay.cpp", value: 120 },
  ]

  const COLORS = ["#22c55e", "#3b82f6", "#f59e0b", "#ef4444"]

  return (
    <div className="min-h-screen p-8
      bg-white text-black
      dark:bg-neutral-950 dark:text-white">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-semibold">
          Dashboard
        </h1>

        <div className="flex items-center gap-4">
          {usuario && <span className="font-medium">Olá, {usuario.nome}</span>}
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-400 transition"
          >
            Sair
          </button>
          <Link
            to="/chat"
            className="bg-neutral-200 dark:bg-neutral-800 px-4 py-2 rounded-lg"
          >
            Voltar ao Chat
          </Link>
        </div>
      </div>

      {/* CARDS DE ESTATÍSTICA */}
      <div className="grid grid-cols-3 gap-6 mb-10">

        <div className="p-6 rounded-xl
          bg-neutral-100 dark:bg-neutral-900
          border border-neutral-200 dark:border-neutral-800">
          <p className="text-sm text-neutral-500">Perguntas feitas</p>
          <p className="text-3xl font-semibold mt-2">1,284</p>
        </div>

        <div className="p-6 rounded-xl
          bg-neutral-100 dark:bg-neutral-900
          border border-neutral-200 dark:border-neutral-800">
          <p className="text-sm text-neutral-500">Respostas geradas</p>
          <p className="text-3xl font-semibold mt-2">1,279</p>
        </div>

        <div className="p-6 rounded-xl
          bg-neutral-100 dark:bg-neutral-900
          border border-neutral-200 dark:border-neutral-800">
          <p className="text-sm text-neutral-500">Arquivos cadastrados</p>
          <p className="text-3xl font-semibold mt-2">42</p>
        </div>

      </div>

      {/* GRÁFICOS */}
      <div className="grid grid-cols-2 gap-8">

        {/* GRÁFICO DE PERGUNTAS */}
        <div className="p-6 rounded-xl
          bg-neutral-100 dark:bg-neutral-900
          border border-neutral-200 dark:border-neutral-800">

          <h2 className="text-lg font-semibold mb-4">
            Perguntas por dia
          </h2>

          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={perguntasPorDia}>
              <XAxis dataKey="dia" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="perguntas"
                stroke="#22c55e"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>

        </div>

        {/* GRÁFICO DE ARQUIVOS MAIS USADOS */}
        <div className="p-6 rounded-xl
          bg-neutral-100 dark:bg-neutral-900
          border border-neutral-200 dark:border-neutral-800">

          <h2 className="text-lg font-semibold mb-4">
            Arquivos mais utilizados
          </h2>

          <div className="flex items-center gap-8">

            {/* Gráfico */}
            <ResponsiveContainer width="60%" height={300}>
              <PieChart>
                <Pie
                  data={arquivosUsados}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={100}
                >
                  {arquivosUsados.map((entry, index) => (
                    <Cell
                      key={index}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>

            {/* Legenda */}
            <div className="flex flex-col gap-3 text-sm">
              {arquivosUsados.map((arquivo, index) => (
                <div
                  key={arquivo.name}
                  className="flex items-center gap-3"
                >
                  <div
                    className="w-3 h-3 rounded-sm"
                    style={{
                      backgroundColor: COLORS[index % COLORS.length],
                    }}
                  />
                  <span className="flex-1">{arquivo.name}</span>
                  <span className="text-neutral-500">{arquivo.value}</span>
                </div>
              ))}
            </div>

          </div>
        </div>

      </div>

      {/* PERGUNTAS RECENTES */}
      <div className="mt-10 p-6 rounded-xl
        bg-neutral-100 dark:bg-neutral-900
        border border-neutral-200 dark:border-neutral-800">

        <h2 className="text-lg font-semibold mb-4">
          Perguntas recentes
        </h2>

        <div className="space-y-3 text-sm">
          <div className="p-3 rounded-lg bg-neutral-200 dark:bg-neutral-800">
            Como funciona a decisão de passes?
          </div>
          <div className="p-3 rounded-lg bg-neutral-200 dark:bg-neutral-800">
            Como o planner.cpp decide interceptar?
          </div>
          <div className="p-3 rounded-lg bg-neutral-200 dark:bg-neutral-800">
            O que faz o bhv_basic_move?
          </div>
          <div className="p-3 rounded-lg bg-neutral-200 dark:bg-neutral-800">
            Como funciona a estratégia defensiva?
          </div>
        </div>

      </div>

    </div>
  )
}
