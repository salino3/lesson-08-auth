import { generateSalt, hashPassword } from '#common/helpers/hash-password.helpers.js';
import {
  connectToDBServer,
  disconnectFromDBServer,
} from '#core/servers/index.js';
import { envConstants } from '#core/constants/index.js';
import { getBookContext } from '#dals/book/book.context.js';
import { getUserContext } from '#dals/user/user.context.js';
import { db } from '#dals/mock-data.js';

export const run = async () => {
  await connectToDBServer(envConstants.MONGODB_URI);
  await getBookContext().insertMany(db.books);

  for(const user of db.users) {

    const salt = await generateSalt();
    const hashedPassword = await hashPassword(user.password, salt);
    await getUserContext().insertOne({
      ...user,
      password: hashedPassword,
      salt,
    });
  };
console.log("Seed complete!")

  await disconnectFromDBServer();
};
