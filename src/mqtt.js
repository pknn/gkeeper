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

  client.subscribe('app/+/+/temperature');
  client.subscribe('app/+/+/brightness');

  client.on('message', (topic, payload) => {
    const [, clientID, clusterID, type] = topic.split(/\//);
    console.log(type, clientID, clusterID, payload.toString('utf-8'));
  });
};
