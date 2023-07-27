const mongoose = require("mongoose");

//permite conectarse a la bases de datos
const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.DB_CNN);
    console.log("DB online");
  } catch (error) {
    console.log("DB error");
    throw new Error("Error a la hora de inicializar BD");
  }
};

module.exports = {
  dbConnection,
};
