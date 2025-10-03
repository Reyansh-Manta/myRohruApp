import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors"
const app = express()

app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}))
app.use(express.json())
app.use(express.urlencoded({
    extended: true,
    limit: "10000kb"
}))
app.use(express.static("public"))
app.use(cookieParser())

app.get("/", (req, res) => {
  res.send("Backend is live ✅");
});

import userRouter from "./routes/user.routes.js"
import postRouter from "./routes/post.routes.js"

app.use("/api/v1/users", userRouter)
app.use("/api/v1/posts", postRouter)

export {app}