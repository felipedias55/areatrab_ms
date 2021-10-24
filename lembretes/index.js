const bodyParser = require('body-parser');
const express = require ('express');
 const app = express();
 const axios = require("axios");

 app.use(bodyParser.json());
 const lembretes = {};
 contador = 0;
 app.get ('/lembretes', (req, res) => {
     res.send(lembretes);
     console.log("estou aqui");
 });
 app.put("/lembretes", async (req, res) => {

     contador++;
     const {texto} = req.body;
     lembretes[contador] ={
         contador, texto,
     };
     await axios.post("http://localhost:10000/eventos", {
 tipo: "LembreteCriado",
 dados: {
 contador,
 texto,
 },
 });
     res.status(201).send(lembretes[contador]);
 });


 app.listen(4000, () => {
 console.log('Lembretes. Porta 4000');
 });

 //adicionar a ambos microsservicos de lembretes e observações
 app.post("/eventos", (req, res) => {
     console.log(req.body);
     res.status(200).send({ msg: "ok" });
     });
