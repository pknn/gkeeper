import repository from './repository';

export default {
  create: async (username, email, passwordHash) => {
    return repository.create(username, email, passwordHash);
  },
  getUser: async username => {
    return repository.getUserByUsername(username);
  }
};
