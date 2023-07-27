const { response } = require("express");
const Evento = require("../models/Evento");
//Obtener eventos
const getEventos = async (req, res = response) => {
  //Obtendo los Eventos de la base de datos y populate es para mostrar los datos de user de manera
  const eventos = await Evento.find().populate("user", "name");

  res.json({
    ok: true,
    eventos,
  });
};
//Crear eventos
const crearEvento = async (req, res = response) => {
  //Crea un nuevo evento con los datos que vienen del req.body, solo va a tomar los datos de Evento es decir el Schema lo demas del bosy será ignorado
  const evento = new Evento(req.body);

  try {
    //Para obtener el id que necesita el evento obtengo ese dato del req.uid. En el req vienen los datos del usuario incluyendo el id y los datos del body, incluso el token.
    evento.user = req.uid;

    //Si los datos estan correctos se guardan en la base de datos con el evento.save()
    const eventoGuardado = await evento.save();

    console.log("eventoGuardado", eventoGuardado);
    //Devuelvo una respuesta con los valores
    res.status(201).json({
      ok: true,
      evento: eventoGuardado,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};
//Actualizar eventos
const ActualizarEvento = async (req, res = response) => {
  //Toma el id del evento a modificar
  const eventoId = req.params.id;
  const uid = req.uid;

  try {
    //Busca el evento en la base de datos por el id
    const evento = await Evento.findById(eventoId);

    if (!evento) {
      return res.status(404).json({
        ok: false,
        msg: "Evento no existe por ese id",
      });
    }

    //Si el usuario es diferente del uid que posee el evento entonces.
    if (evento.user.toString() !== uid) {
      return res.status(401).json({
        ok: false,
        msg: "No tiene privilegios para editar este evento",
      });
    }

    //toma todos los datos del req.body y agregar el id del usuario el cual no viene en el req.body
    const nuevoEvento = {
      ...req.body,
      user: uid,
    };

    //Para actualizar se llama la funcion y se agrega el evento y se agregan los parametros del id del evento, el nuevo parametro y en caso de new: true es para que se reflejen los cambios de inmediato
    const eventoActualizado = await Evento.findByIdAndUpdate(
      eventoId,
      nuevoEvento,
      { new: true }
    );

    res.json({
      ok: true,
      evento: eventoActualizado,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};
//Obtener eventos
const EliminarEvento = async (req, res = response) => {
  //Toma el id del evento a modificar
  const eventoId = req.params.id;
  const uid = req.uid;

  try {
    //Busca el evento en la base de datos por el id
    const evento = await Evento.findById(eventoId);

    if (!evento) {
      return res.status(404).json({
        ok: false,
        msg: "Evento no existe por ese id",
      });
    }

    //Si el usuario es diferente del uid que posee el evento entonces.
    if (evento.user.toString() !== uid) {
      return res.status(401).json({
        ok: false,
        msg: "No tiene privilegios para eliminar este evento",
      });
    }

    //Se elimina el dato con el uso de id
    await Evento.findByIdAndDelete(eventoId);

    res.json({ ok: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

module.exports = { getEventos, crearEvento, ActualizarEvento, EliminarEvento };
