import service from './service';

export default {
  getGreenhouse: async (request, response) => {
    const { id } = request.params;
    try {
      const greenhouse = await service.getGreenhouse(id);
      if (!greenhouse) {
        response.sendStatus(404);
      } else {
        response.json(greenhouse);
      }
    } catch (error) {
      response.status(400).send(error);
    }
  },
  updateGreenhouse: async (request, response) => {
    const { id } = request.params;
    const { name, plant } = request.body;
    if (!name || !plant) {
      response.sendStatus(400);
    } else {
      try {
        const result = await service.updateGreenhouse(id, name, plant);
        if (result) {
          response.json(result);
        } else {
          response.sendStatus(404);
        }
      } catch (error) {
        response.status(400).send(error);
      }
    }
  },
  getStatistics: async (request, response) => {
    const { id } = request.params;
    const { type } = request.query;
    try {
      if (type) {
        const result = await service.getStatWithType(id, type);
        response.json(result);
      } else {
        const result = await service.getStatOf(id);
        response.json(result);
      }
    } catch (error) {
      response.status(400).send(error);
    }
  }
};
