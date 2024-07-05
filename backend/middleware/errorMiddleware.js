export const errorHandler = (err, req, res, next) => {
  //res.statusCode is this res.status(400) in the controller
  const statusCode = res.statusCode ? res.statusCode : 500;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};
