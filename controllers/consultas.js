
const { pool } = require("../config/db");

exports.createUser = async ({ email, password, rol, lenguage }) => {
    try {
        const consulta = "INSERT INTO usuarios values (DEFAULT, $1, $2, $3, $4)";
        const valores = [email, password, rol, lenguage ];
        const resultado = await pool.query(consulta, valores);
        return resultado;
    } catch (error) {
        throw error;
    }
}

exports.verifyCredentials = async (email, password) => {

    
    try {
    const consulta = "SELECT * FROM usuarios WHERE email = $1 AND password = $2;";

    
    const values = [email, password];
    const { rowCount } = await pool.query(consulta, values);
    console.log('row', rowCount)
    if (!rowCount) {
      throw {
        code: 404,
        message: "No se encontró ningún usuario con estas credenciales",
      };
    }
    } catch (error) {
        throw error;
    }
    
  };


  exports.getUserVerify = async (email) => {
    try {
      const consulta = "SELECT * FROM usuarios WHERE email = $1";
      const values = [email]
      const { rows } = await pool.query(consulta, values);
    console.log('rows: ',rows)
      return rows;
    } catch (error) {
      console.log("No se pudo llevar a cabo la consulta", error);
      return error;
    }
  };