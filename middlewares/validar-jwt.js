const { response } = require("express");
const jwt = require("jsonwebtoken");

//Token para validar la continuidad de la ejecución, si un usuario no posee el token entonces esta funcion no va a llamar la funcion next, de modo que no se ejecutaran mas funciones y lanzara un error.
const validarJWT = (req, res = response, next) => {
  //x-token headers
  const token = req.header("x-token");

  if (!token) {
    return res.status(401).json({
      ok: false,
      msg: "No hay token en la petición",
    });
  }

  try {
    const { uid, name } = jwt.verify(token, process.env.SECRET_JWT_SEED);

    req.uid = uid;
    req.name = name;
  } catch (error) {
    return res.status(401).json({
      ok: false,
      msg: "Token no valido",
    });
  }
  next();
};

module.exports = { validarJWT };
