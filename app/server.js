import express from "express";
import cors from "cors";
import morgan from "morgan";

import controllUsuarios from "./controlls/Usuarios.controll.js";
import controllTrans from "./controlls/Transferencias.controll.js";


import * as path from "path";
import { fileURLToPath } from "url";
const __direname = path.dirname(fileURLToPath(import.meta.url));

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());
app.use(morgan('tiny'));

app.use(express.static("public"));
//ruta principal
app.get("/",(req,res)=>{
    res.sendFile(path.resolve(__direname, "../public/index.html"));
});

//enpoint usuarios
app.get("/api/v1/bankSolar/usuarios", controllUsuarios.getAllUsuarios);
app.post("/api/v1/bankSolar/usuarios", controllUsuarios.addUsuario);
app.delete("/api/v1/bankSolar/usuarios/:id", controllUsuarios.deleteUsuario);
app.put("/api/v1/bankSolar/usuarios/:id", controllUsuarios.updateUsuario);

//endpoint transferencias
app.post("/api/v1/transferir", controllTrans.transferir);
app.get("/api/v1/transferir", controllTrans.getTransaction);
app.delete("/api/v1/transferir/:id", controllTrans.deleteTrans);

export default app;

