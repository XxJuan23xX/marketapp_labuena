const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    console.log("Token is missing"); // Mensaje de depuración
    return res.status(401).json({ message: 'No token, authorization denied' });
    onsole.log("Received token:", token); // Agregar esta línea para depuración
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.error("Invalid token:", error.message); // Mensaje de error más detallado
    return res.status(401).json({ message: 'Token is not valid' });
  }
};

module.exports = authMiddleware;
