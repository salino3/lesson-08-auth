import { hashPassword } from '#common/helpers/hash-password.helpers.js';
import { getUserContext } from '../user.context.js';
import { User } from '../user.model.js';
import { UserRepository } from './user.repository.js';

export const dbRepository: UserRepository = {
 getUserByEmailAndPassword: async (email, password) => {
  const user = await getUserContext().findOne({
    email
  });

  const hashedPassword = await hashPassword(password, user?.salt);
  return user?.password === hashedPassword ? (({
    _id: user._id,
    email: user.email,
    role: user.role
  }) as User) : null;
 },
};
