/**
 * Simple logger utility to replace console statements
 */
const logger = {
  error: (message, error) => {
    if (process.env.NODE_ENV !== 'production') {
      // eslint-disable-next-line no-console
      console.error(message, error);
    }
  },
  info: (message) => {
    if (process.env.NODE_ENV !== 'production') {
      // eslint-disable-next-line no-console
      console.log(message);
    }
  }
};

module.exports = logger;
