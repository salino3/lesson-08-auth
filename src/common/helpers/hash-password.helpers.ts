import crypto from 'crypto';
import { promisify } from 'util';


const randomBytes = promisify(crypto.randomBytes);

const pbkdf2 = promisify(crypto.pbkdf2);

const saltLenght = 16;

const passwordLenght = 64;

const iterations = 1000;

const digestAlgorithm = 'sha512';

//
export const generateSalt = async (): Promise<string> => {

  const salt = await randomBytes(saltLenght);
  return salt.toString('hex');
};

export const hashPassword = async(password: string, salt: string): Promise<string> => {

 const hashedPassword = await pbkdf2(password, salt, iterations, passwordLenght, digestAlgorithm);

 return hashedPassword.toString('hex');
};
