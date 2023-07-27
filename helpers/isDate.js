const moment = require("moment");

//Valida que el valor enviado por el evento sea una fecha valida
const isDate = (value, { req, location, path }) => {
  if (!value) {
    return false;
  }

  const fecha = moment(value);
  if (fecha.isValid()) {
    return true;
  } else {
    return false;
  }
};

module.exports = { isDate };
