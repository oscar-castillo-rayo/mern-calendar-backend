const { response } = require("express");
const Usuario = require("../models/Usuario");
const bcrypt = require("bcryptjs");
const { generarJWT } = require("../helpers/jwt");

//res = response es para que el intellicense funcione y autocomplete.
const crearUsuario = async (req, res = response) => {
  //se toman los datos del body
  const { email, password } = req.body;

  try {
    let usuario = await Usuario.findOne({ email });

    if (usuario) {
      return res.status(400).json({
        ok: false,
        msg: "Un usuario ya existe con ese correo",
      });
    }
    //La instancia de usuario solo va a tomar del req.body los datos que necesite
    usuario = new Usuario(req.body);

    //Generar JWT

    //Encrptar contraseña
    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync(password, salt);

    //Guardar los datos del usuario
    await usuario.save();

    //Generar JWT
    const token = await generarJWT(usuario.id, usuario.name);

    //Si todo salio bien se envia la respuesta con los datos del usuario y el estatus 201
    res.status(201).json({
      ok: true,
      uid: usuario.id,
      name: usuario.name,
      token,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Por favor hable con el administrador",
    });
  }
};

const loginUsuario = async (req, res = response) => {
  //Obtengo los datos del body
  const { email, password } = req.body;

  try {
    const usuario = await Usuario.findOne({ email });

    //Valida que exista un usuario de lo contrario devuelve un mensaje
    if (!usuario) {
      return res.status(400).json({
        ok: false,
        msg: "El usuario no existe con ese email",
      });
    }

    //Confirmar los passwords
    const validPassword = bcrypt.compareSync(password, usuario.password);

    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        msg: "Password incorrecto",
      });
    }

    //Generar JWT
    const token = await generarJWT(usuario.id, usuario.name);

    //Si todo esta correcto devuelve los datos del usuario
    res.json({
      ok: true,
      uid: usuario.id,
      name: usuario.name,
      token,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Por favor hable con el administrador",
      email,
      password,
    });
  }
};

const revalidarToken = async (req, res = response) => {
  const { uid, name } = req;

  //generar token
  const token = await generarJWT(uid, name);
  res.json({
    ok: true,
    token,
  });
};

module.exports = {
  crearUsuario,
  loginUsuario,
  revalidarToken,
};
