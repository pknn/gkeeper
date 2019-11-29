import mqtt from 'mqtt';

export default () => {
  const { MQTT_BROKER_URI, MQTT_BROKER_USERNAME, MQTT_BROKER_PASSWORD } = process.env;

  const client = mqtt.connect(MQTT_BROKER_URI, {
    username: MQTT_BROKER_USERNAME,
    password: MQTT_BROKER_PASSWORD,
    will: {
      topic: 'app/status',
      payload: 'Client Disconnect Unexpectedly',
      retain: true
    }
  });

  client.on('connect', () => {
    client.publish('app/status', 'Client Connected');
  });
  client.subscribe('app/+/+/+');

  client.on('message', (topic, payload) => {
    const [, userID, greenhouseID, type] = topic.split(/\//);
    console.log(type, userID, greenhouseID, payload.toString('utf-8'));
  });
};
