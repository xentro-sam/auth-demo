const redis = require('redis');
const client = redis.createClient();

const redisSetup = async () => { 
    client.on('error', (err) => {
    console.log('Redis Client Error ' + err);
    });

    await client.connect();
};

redisSetup();

module.exports = client;