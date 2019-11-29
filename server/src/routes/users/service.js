import repository from './repository';

export default {
  createUser: username => {
    return repository.create(username);
  },
  getUsers: () => {
    return repository.getAll();
  },
  updateUser: (id, username) => {
    return repository.update(id, username);
  },
  getUser: id => {
    return repository.get(id);
  },
  getUserByUsername: async username => {
    return repository.getByUsername(username);
  },
  getGreenhousesOf: async id => {
    return repository.getGreenhousesOf(id);
  },
  newGreenhouseOf: async (id, name, plant) => {
    return repository.newGreenhouseOf(id, name, plant);
  }
};
