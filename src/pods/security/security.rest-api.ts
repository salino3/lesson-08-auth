import { Router } from 'express';
import {userRepository} from '#dals/index.js';

export const securityApi = Router();

securityApi.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;
    // Check is valid user
    const user = await userRepository.getUserByEmailAndPassword(email, password);

    if(user) {
      //? userSession.save(user)

      // Create token with user info

      // Send token
    }else {
      res.sendStatus(401);
    }

  } catch (error) {
    next(error);
  }
});
