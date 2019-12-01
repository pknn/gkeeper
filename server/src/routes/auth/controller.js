import bcrypt from 'bcrypt';
import service from './service';

const saltRounds = 15;

export default {
  signUp: async (request, response) => {
    const { username, email, password } = request.body;
    if (!username || !email || !password) {
      response.sendStatus(400);
    } else {
      try {
        const hash = await bcrypt.hash(password, saltRounds);
        await service.create(username, email, hash);
        response.sendStatus(201);
      } catch (error) {
        response.status(400).send(error);
      }
    }
  },
  login: async (request, response) => {
    const { username, password } = request.body;
    if (!username || !password) {
      response.sendStatus(400);
    } else {
      try {
        const user = await service.getUser(username);
        if (!user) {
          response.sendStatus(404);
        } else {
          const result = await bcrypt.compare(password, user.password_hash);
          if (result) {
            response.json(user);
          } else {
            response.sendStatus(403);
          }
        }
      } catch (error) {
        response.status(400).send(error);
      }
    }
  }
};
