// Variables
const express = require("express");
const path = require("path");
const app = express();
const PORT = 3000;

app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')));

app.get("/",(req,res)=>{
    res.send("Bienvenido")
});

app.get("/productos",(req,res)=>{
    res.send("Listado de productos")
});

app.post("/productos", (req, res) => {
    res.send("crear un producto");
});

app.put("/productos", (req, res) => {
    res.send("actualizar un producto");
});

app.delete("/productos", (req, res) => {
    res.send("borrar un producto");
});

app.get("/usuarios",(req,res)=>{
    res.send("Listado de usuarios")
});

app.post("/usuarios", (req, res) => {
    res.send("crear un usuario");
});

app.put("/usuarios", (req, res) => {
    res.send("actualizar un usuario");
});

app.delete("/usuarios", (req, res) => {
    res.send("borrar un usuario");
});


// Events
app.listen(PORT, () => {
    console.log(`server started on ${PORT}`)
});
