import { Router } from 'express';
import jwt from 'jsonwebtoken';
import {userRepository} from '#dals/index.js';
import { UserSession} from '#common-app/models/index.js';
import { envConstants } from '#core/constants/env.constants.js';

export const securityApi = Router();


securityApi.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;
    // Check is valid user
    const user = await userRepository.getUserByEmailAndPassword(email, password);

    if(user) {
      const userSession: UserSession = {
        id: user._id.toHexString()
      }
      const token = jwt.sign(userSession, envConstants.AUTH_SECRET, {
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
