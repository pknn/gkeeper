import mqtt from 'mqtt';
import statistics from './statistics';

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
    const [, username, greenhouseName, type] = topic.split(/\//);
    try {
      const value = parseFloat(payload.toString('utf-8'));
      statistics.create(username, greenhouseName, type, value);
    } catch (error) {
      // JUST PASS
    }
  });
};
