import service from './service';

export default {
  getUsers: async (request, response) => {
    const { username } = request.query;
    try {
      if (username) {
        const user = await service.getUserByUsername(username);
        if (!user) {
          response.sendStatus(404);
        } else {
          response.json(user);
        }
      } else {
        const users = await service.getUsers();
        response.json(users);
      }
    } catch (error) {
      response.status(400).send(error);
    }
  },
  updateUser: async (request, response) => {
    const { id } = request.params;
    const { username } = request.body;
    if (!username) {
      response.sendStatus(400);
    } else {
      try {
        const user = await service.updateUser(id, username);
        if (user) {
          response.json(user);
        } else {
          response.sendStatus(404);
        }
      } catch (error) {
        response.status(400).send(error);
      }
    }
  },
  getUser: async (request, response) => {
    const { id } = request.params;
    try {
      const user = await service.getUser(id);
      if (!user) {
        response.sendStatus(404);
      } else {
        response.json(user);
      }
    } catch (error) {
      response.status(400).send(error);
    }
  },
  getUserGreenhouses: async (request, response) => {
    const { id: userID } = request.params;
    try {
      const greenhouses = await service.getGreenhousesOf(userID);
      response.json(greenhouses);
    } catch (error) {
      response.status(400).send(error);
    }
  },
  newUserGreenhouse: async (request, response) => {
    const { id: userID } = request.params;
    const { name, plant } = request.body;
    if (!name || !plant) {
      response.sendStatus(400);
    } else {
      try {
        await service.newGreenhouseOf(userID, name, plant);
        response.sendStatus(201);
      } catch (error) {
        response.status(400).send(error);
      }
    }
  }
};
