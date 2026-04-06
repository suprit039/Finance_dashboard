const log = (level, message, meta = {}) => {
  const timestamp = new Date().toISOString();

  console.log(
    JSON.stringify({
      level,
      message,
      timestamp,
      ...meta,
    })
  );
};

const logger = {
  info: (msg, meta) => log("INFO", msg, meta),
  error: (msg, meta) => log("ERROR", msg, meta),
  warn: (msg, meta) => log("WARN", msg, meta),
};

module.exports = logger;