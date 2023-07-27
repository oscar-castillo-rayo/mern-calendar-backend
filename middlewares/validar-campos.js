const { response } = require("express");
const { validationResult } = require("express-validator");

//Es igual a una funcion que recibe req, res pero este recibe un next para continuar con las demas ejecuciones.
const validarCampos = (req, res = response, next) => {
  //Manejo de errores
  const errors = validationResult(req);

  //Valida los errores si existe alguno devurlve los datos de error
  if (!errors.isEmpty()) {
    return res.status(400).json({
      ok: false,
      errors: errors.mapped(),
    });
  }
  next();
};

module.exports = { validarCampos };
