const redis = require('../config/redis');
const util = require('util');

// Promisify for async/await
redis.get = util.promisify(redis.get);
redis.set = util.promisify(redis.set);
redis.del = util.promisify(redis.del);

const getTodoCacheKey = (userId, page, limit) => `todos:user:${userId}:page:${page}:limit:${limit}`;

// Set todos in cache
async function cacheUserTodos(userId, page, limit, todos) {
    const key = getTodoCacheKey(userId, page, limit);
    await redis.set(key, JSON.stringify(todos), 'EX', 300); // expire in 5 minutes
}

// Get todos from cache
async function getCachedUserTodos(userId, page, limit) {
    const key = getTodoCacheKey(userId, page, limit);
    const cached = await redis.get(key);
    return cached ? JSON.parse(cached) : null;
}

// Invalidate all pages for this user
async function invalidateUserTodoCache(userId) {
    const stream = redis.scanStream({ match: `todos:user:${userId}:*` });
    stream.on('data', (keys) => {
        keys.forEach((key) => redis.del(key));
    });
}

module.exports = {
    cacheUserTodos,
    getCachedUserTodos,
    invalidateUserTodoCache
};
