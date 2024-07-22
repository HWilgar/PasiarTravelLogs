import { Router } from 'express';
import multer from 'multer';
import { storage } from '../config/storage.js';
import { 
  getAllDestination,
   addDestination,
   updateDestination,
   getDestination,
   deleteDestination
   } from '../controllers/destination.controller.js';
import { verifyAccessToken } from "../middleswares/auth.middleware.js";

const destinationRouter = Router();
const destinationImage = multer({ storage });

destinationRouter.get("/", verifyAccessToken, getAllDestination);
destinationRouter.post("/", verifyAccessToken, addDestination);
destinationRouter.get("/:desId", verifyAccessToken, getDestination);
destinationRouter.patch("/:desId", verifyAccessToken, updateDestination);
destinationRouter.delete("/:desId", verifyAccessToken, deleteDestination);

export default destinationRouter;