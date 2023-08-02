const express = require("express");
const { dbConnection } = require("./database/config");
require("dotenv").config();
const cors = require("cors");

//Crear el servidor de express
const app = express();

// bases de datos
dbConnection();

//CORS
app.use(cors());

//Directorio publico
//use es como un midleware que se va a ejecutar en el momento qu alguien haga una peticion
app.use(express.static("public"));

//lectura y parseo del body(para extraer la informacion del body)
app.use(express.json());
//Rutas
app.use("/api/auth", require("./routes/auth"));
app.use("/api/events", require("./routes/events"));

app.get("*", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});
//Puerto para escuchar peticiones
app.listen(process.env.PORT, () => {
  console.log("servidor corriendo en el puerto 4000");
});
