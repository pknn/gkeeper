import repository from './repository';
import db from '../../db';

export default {
  create: async (request, response) => {
    const { greenhouseID, type, value } = request.body;
    try {
      await repository.createByGreenhouseID(greenhouseID, type, value);
      response.sendStatus(201);
    } catch (error) {
      response.status(400).send(error);
    }
  },
  get: async (request, response) => {
    const { id, dt, type } = request.query;
    try {
      if (dt === 'hourly') {
        const result = await repository.getHourly(id, type);
        response.json(result);
      } else if (dt === 'daily') {
        const result = await repository.getDaily(id, type);
        response.json(result);
      } else {
        const result = await repository.getMinutely(id, type);
        response.json(result);
      }
    } catch (error) {
      console.log(error);
      response.status(400).send();
    }
  },
  getLatest: async (request, response) => {
    const { id, type } = request.query;
    try {
      const result = await repository.getLatest(id, type);
      response.json(result);
    } catch (error) {
      console.error(error);
      response.status(400).send();
    }
  },
  getWatering: async (request, response) => {
    const { id } = request.query;
    try {
      const result = await repository.getWatering(id);
      response.json(result);
    } catch (error) {
      response.status(400).send();
    }
  }
};
