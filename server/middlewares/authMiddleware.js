// Basic authentication middleware to check whether there is a current user session

const sessionValidationMiddleware = (req, res, next) => {
  if (!req.session.userId) {
    return res.status(401).send("Session not found or invalid");
  }
  next();
};

module.exports = sessionValidationMiddleware;
