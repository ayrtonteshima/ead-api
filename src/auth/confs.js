exports.SECONDS_FROM_1970_TO_NOW = Math.floor(Date.now() / 1000);
exports.LOGIN_EXPIRATION_TIME = 3600; // 1h
exports.BLACKLIST_CACHE_PREFIX = 'backlistUserToken:';
exports.ALGORITHM = 'HS256';
