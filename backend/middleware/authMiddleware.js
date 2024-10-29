const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
    onsole.log("Received token:", token); // Agregar esta línea para depuración
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded token:", decoded); // Verifica el contenido del token
    req.user = decoded; // Debería contener { id, role }
    next();
  } catch (error) {
    console.error("Token verification error:", error); // Agregar esta línea
    res.status(401).json({ message: 'Token is not valid' });
  }
};

module.exports = authMiddleware;
