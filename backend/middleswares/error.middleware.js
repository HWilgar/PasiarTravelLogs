import { cloudinary } from "../config/storage.js";

const pageNotFound = (request, response, next) => {
  const error =  new Error(`Not found - ${request.originalUrl}`);
  response.status(400);
  next(error);
};

const errorHandler = (error, request, response, next) => {
  const statusCode = response.statusCode=== 200 ? 500 : response.statusCode;

  console.error({
    message: error.message,
    stack: error.statck,
  });

  response.status(statusCode).send({ message: error.message});
};

const asyncHandler = (controller) => {
  return async (request, response, next) => {
    try {
      await controller(request, response, next);
    } catch (error) {
      if(request.file){
        const { filename } = request.file;
        await cloudinary.uploader.destroy(filename);
      }

      next(error);
    }
  };
};

export { errorHandler, pageNotFound, asyncHandler };
