import repository from './repository';

export default {
  getGreenhouse: async id => {
    return repository.get(id);
  },
  updateGreenhouse: async (id, name, plant) => {
    return repository.update(id, name, plant);
  },
  getStatWithType: async (id, type) => {
    return repository.getStatOfType(id, type);
  },
  getStatOf: async id => {
    return repository.getStatOf(id);
  }
};
