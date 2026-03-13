import express from "express"
import cors from "cors"
import usuarioRoutes from "./routes/usuarioRoutes.js"

const app = express()

app.use(cors())              // ← permite acesso do React
app.use(express.json())

app.use("/usuarios", usuarioRoutes)

export default app
