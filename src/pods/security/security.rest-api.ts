import { Router } from 'express';
import jwt from 'jsonwebtoken';
import {userRepository} from '#dals/index.js';
import {userSession} from '#common-app/models/index.js';

export const securityApi = Router();


securityApi.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;
    // Check is valid user
    const user = await userRepository.getUserByEmailAndPassword(email, password);

    if(user) {
      const userSession: userSession = {
        id: user._id.toHexString()
      }
      const secret = 'my-secret'; // TODO: Move it to .env file
      const token = jwt.sign(userSession, secret, {
        expiresIn: '1d',
        algorithm: 'HS256'
      });
      res.send(`Bearer ${token}`);

    }else {
      res.sendStatus(401);
    }

  } catch (error) {
    next(error);
  }
});
