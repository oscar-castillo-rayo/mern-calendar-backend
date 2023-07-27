const { Schema, model } = require("mongoose");

//Son los datos del usuario que se van a ingresar a la base de datos
const UsuarioSchema = Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

module.exports = model("Usuario", UsuarioSchema);
