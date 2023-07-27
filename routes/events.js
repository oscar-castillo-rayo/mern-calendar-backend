/*
Event Routes
/api/events
*/

const { Router } = require("express");
const { check } = require("express-validator");

const { validarJWT } = require("../middlewares/validar-jwt");
const {
  getEventos,
  crearEvento,
  ActualizarEvento,
  EliminarEvento,
} = require("../controllers/events");
const { validarCampos } = require("../middlewares/validar-campos");
const { isDate } = require("../helpers/isDate");

const router = Router();
//Todas las peticiones deben pasar por la validación del JWT en vez de enviar validarJWT a cada router se utiliza `use` para aplicarlo a todos los routers
router.use(validarJWT);

//Obtener eventos
router.get("/", getEventos);

//Crear un nuevo evento, primero valida las entradas.
router.post(
  "/",
  [
    check("title", "El título es obligatorio").not().isEmpty(),
    check("start", "Fecha de inicio es obligatoria").custom(isDate),
    check("end", "Fecha de finalización es obligatoria").custom(isDate),
    validarCampos,
  ],
  //Si todo es correcto llama a la funcion para crear el evento
  crearEvento
);

//Actualizar un evento
router.put("/:id", ActualizarEvento);

//Borrar un evento
router.delete("/:id", EliminarEvento);

module.exports = router;
