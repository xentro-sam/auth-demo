const redis = require('redis');

const config = {
    socket: {
        host: "docker.for.mac.localhost",
        port: 6379
    }
}
const client = redis.createClient(config);

const redisSetup = async () => { 
    client.on('error', (err) => {
    console.log('Redis Client Error ' + err);
    });

    await client.connect();
};

redisSetup();

module.exports = client;