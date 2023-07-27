const { Schema, model } = require("mongoose");

//Son los datos del usuario que se van a ingresar a la base de datos
const EventoSchema = Schema({
  title: {
    type: String,
    required: true,
  },
  notes: {
    type: String,
  },
  start: {
    type: Date,
    required: true,
  },
  end: {
    type: Date,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "Usuario",
    required: true,
  },
});

//Esto permite modificar la forma en la que se visualiza la información en la base de datos.
EventoSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

module.exports = model("Evento", EventoSchema);
