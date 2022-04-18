const standardResponse = require("./responseHandling");

const errorHandling = (err, req, res, next) => {
  const statusCode = err.status;
  const message = err.message;
  standardResponse.response(res, null, statusCode, message);
};

module.exports = { errorHandling };
