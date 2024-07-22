import jwt from 'jsonwebtoken';

const createAccessToken = (user) => {
  const data = { userId: user._id };
  return jwt.sign(data, process.env.JWT_SECRET);
};

const verifyAccessToken = (request, response, next) => {
  try {
    if(request.headers.authorization !== undefined) {
      const token = request.headers. authorization.split(" ")[1];

      const { userId } = jwt.verify(token, process.env.JWT_SECRET);
      request.body.userId = userId;
      next();
    } else {
      return response.status(401).send({
        messae: "Access token missing.",
      });
    }
  } catch (error){
    console.error(error.message);
    response.status(403).send({ message: error.message });
  }
};

export { createAccessToken, verifyAccessToken };