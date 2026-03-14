import express from "express"
import cors from "cors"
import usuarioRoutes from "./routes/usuarioRoutes.js"
import documentoRouter from "./routes/documentoRoutes.js";

const app = express()

app.use(cors())
app.use(express.json())

// Rotas
app.use("/usuarios", usuarioRoutes)
app.use("/documentos", documentoRouter);

export default app
