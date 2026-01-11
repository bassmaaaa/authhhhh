import jwt from 'jsonwebtoken';
import env from '../config/env.js';

export const verifyToken = (req, res, next) => {
  try {
    // Get token from header: "Authorization: Bearer <token>"
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
      return res.status(401).json({ error: 'Authorization header missing' });
    }

    const token = authHeader.split(' ')[1]; // Bearer <token>
    if (!token) {
      return res.status(401).json({ error: 'Token missing' });
    }

    // Verify token
    jwt.verify(token, env.jwt.secret, (err, decoded) => {
      if (err) {
        return res.status(403).json({ error: 'Invalid or expired token' });
      }

      // Attach user info to request
      req.user = { id: decoded.id, email: decoded.email };
      next(); // proceed to controller
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};
