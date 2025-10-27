const redis = require('redis');

class CacheService {
  constructor() {
    const redisServer = process.env.REDIS_SERVER || 'localhost:6379';
    const [host, port] = redisServer.split(':');

    this.client = redis.createClient({
      socket: {
        host,
        port: parseInt(port, 10),
      },
    });

    this.client.on('error', (error) => {
      console.error('Redis Client Error:', error);
    });

    this.client.connect().catch((err) => {
      console.error('Failed to connect to Redis:', err);
    });
  }

  async set(key, value, expirationInSecond = 1800) {
    await this.client.set(key, value, {
      EX: expirationInSecond,
    });
  }

  async get(key) {
    const result = await this.client.get(key);
    return result;
  }

  async delete(key) {
    await this.client.del(key);
  }
}

module.exports = CacheService;
