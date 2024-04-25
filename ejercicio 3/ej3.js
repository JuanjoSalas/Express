// Variables
const express = require("express");
const path = require("path");
const app = express();
const PORT = 3000;

const items = [
    {
        id: 1, 
        nombre: 'Taza de Harry potter', 
        precio: 300},
    {
        id: 2,
        nombre: 'FIFA 23 PS5',
        precio: 1000},
    {
        id: 3,
        nombre: 'Figura Goku Super Saiyan',
        precio: 100},
    {
        id: 4,
        nombre: 'Zelda Breath of the Wild',
        precio: 200},
    {
        id: 5,
        nombre: 'Skin Valorant',
        precio: 120},
    {
        id: 6,
        nombre: 'Taza de Star Wars',
        precio: 220},
    ];

    app.use(express.json())
    app.use(express.static(path.join(__dirname, 'public')));

app.get("/", (req, res) => {
  res.send({msg:"Productos",items});
});

app.post("/",(req,res)=>{
    const newItem ={
        id:items.length +1,
        nombre:req.body.nombre,
        precio:req.body.precio,
    }
    items.push(newItem)
    res.status(201).send(items)
});

app.put("/id/:id",(req,res)=>{
    const found = items.some(item => item.id == req.params.id)

    if(found){
        items.forEach(item =>{
            if(item.id == req.params.id){
                item.nombre =req.body.nombre ?req.body.nombre: item.nombre
                item.precio =req.body.precio || item.precio
            }
        })
        res.send(items)
    }else{
        res.status(404).send(`item with id ${req.params.id} not found`)
    }
});

app.delete("/id/:id",(req,res)=>{
    const found = items.some(item => item.id == req.params.id)
    if(found){
        const itemsFilter = items.filter(item => item.id == req.params.id)
        res.send(itemsFilter)
    }else{
        res.status(404).send(`item with id ${req.params.id} not found`)
    }
});

app.get("/precio/:precio", (req, res) => {
    const found = items.some(item => item.precio == req.params.precio)
    if (found) {
        const precioFilter = items.filter(item => item.precio == req.params.precio)
        res.send(precioFilter)
    }else{
        res.status(404).send(`item with precio ${req.params.precio} not found`)
    }
  });

  app.get("/rango/:precioRange", (req, res) => {
    const precioRange = req.params.precioRange.split("-");
    
    if (precioRange.length !== 2 || isNaN(parseFloat(precioRange[0])) || isNaN(parseFloat(precioRange[1]))) {
        res.status(400).send("Invalid price range format. Please use format minPrice-maxPrice");
        return;
    }
    
    const precioMin = parseFloat(precioRange[0]);
    const precioMax = parseFloat(precioRange[1]);
    
    if (precioMin >= precioMax) {
        res.status(400).send("Invalid price range. Max price should be greater than min price.");
        return;
    }

    const productosEnIntervalo = items.filter(item => {
        return item.precio >= precioMin && item.precio <= precioMax;
    });

    if (productosEnIntervalo.length > 0) {
        res.send(productosEnIntervalo);
    } else {
        res.status(404).send(`No items found in the price range: ${precioMin} - ${precioMax}`);
    }
});

app.get("/id/:id",(req,res)=>{
    const found = items.some(item => item.id == req.params.id)
    if(found){
        const itemsFilter = items.filter(item => item.id == req.params.id)
        res.send(itemsFilter)
    }else{
        res.status(404).send(`item with id ${req.params.id} not found`)
    }
});

app.get("/nombre/:nombre",(req,res)=>{
    const found = items.some(item => item.nombre == req.params.nombre)
    if(found){
        const itemsFilter = items.filter(item => item.nombre == req.params.nombre)
        res.send(itemsFilter)
    }else{
        res.status(404).send(`item with nombre ${req.params.nombre} not found`)
    }
});

app.listen(PORT, () => console.log(`Servidor levantado en el puerto ${PORT}`));