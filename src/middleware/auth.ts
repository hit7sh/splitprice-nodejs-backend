import * as jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config()

const SECRET = process.env.SECRET;

export const authenticateJwt = (req:any, res:any, next:any) => {
  const authHeader = req.headers.authorization;
  if (authHeader && SECRET) {
    const token = authHeader.split(' ')[1];
    jwt.verify(token, SECRET, (err: any, user: any) => {
      if (err) {
        return res.sendStatus(403);
      }
      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};
