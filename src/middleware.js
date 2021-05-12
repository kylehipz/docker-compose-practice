const koaJwt = require('koa-jwt');
const jwt = require('jsonwebtoken');

const { JWT_SECRET } = process.env;

const generateToken = (user) => {
  return jwt.sign({ ...user, iat: Date.now() / 1000 }, JWT_SECRET, {
    expiresIn: '1h'
  });
};

const jwtMiddleware = () => koaJwt({ secret: JWT_SECRET });

const getPayload = (bearerToken) => {
  const token = bearerToken.split(' ')[1];
  return jwt.decode(token);
};

const checkIfAdmin = async (ctx, next) => {
  const { isAdmin } = getPayload(ctx.request.header.authorization);

  if (!isAdmin) {
    ctx.body = {
      message: 'Not Authorized'
    };
    ctx.status = 401;
    return;
  }

  await next();
};

module.exports = {
  generateToken,
  jwtMiddleware,
  getPayload,
  checkIfAdmin
};
