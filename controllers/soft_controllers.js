const { createUser, verifyCredentials } = require("./consultas");
const ErrorResponse = require("../helpers/errorResponse");
const jwt = require("jsonwebtoken");
const JWT_SECRET_WORD = process.env.JWT_SECRET_WORD;

exports.create = async (req, res, next) => {
  try {
    const { email, password, rol, lenguage } = req.body;

    if (![email, password, rol, lenguage].includes("")) {
      const usuario = {
        email,
        password,
        rol,
        lenguage,
      };

      await createUser(usuario);
    } else {
      return res.send("Los campos no pueden ir vacíos");
    }

    return res.send("Usuario creado con éxito");
  } catch (err) {
    next(
      new ErrorResponse("Error, no ha sido posible crear usuario" + err + 404)
    );
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(new ErrorResponse("Ingrese un email y un password", 400));
    }

    const valorBool = await verifyCredentials(email, password);

    if (!valorBool) {
      return next(new ErrorResponse("Las credenciales son incorrectas", 400));
    }

    const token = jwt.sign({ email }, JWT_SECRET_WORD, {
      expiresIn: process.env.JWT_EXPIRE,
    });

    res.send(token);
  } catch (err) {
    next(
      new ErrorResponse("Error, no ha sido posible iniciar sesión" + err + 404)
    );
  }
};

exports.getUser = async (req, res, next) => {
  try {
    return res.json(req.usuario);
  } catch (err) {
    next(
      new ErrorResponse(
        "Error, no ha sido posible obtener el usuario" + err + 404
      )
    );
  }
};
