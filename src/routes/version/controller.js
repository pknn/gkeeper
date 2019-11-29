export default {
  get: (_, response) => {
    response.json({
      version: process.env.APP_VERSION
    });
  }
};
