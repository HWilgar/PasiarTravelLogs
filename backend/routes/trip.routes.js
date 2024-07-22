import { Router } from 'express';
import multer from 'multer';
import { storage } from '../config/storage.js';
import { 
  addTrip,
  getAllTripsByUser,
  getTripById,
  updateTrip,
  deleteTrip
 } from '../controllers/trip.controller.js';
 import { getAllDestination, addDestination } from '../controllers/destination.controller.js';
import { verifyAccessToken } from "../middleswares/auth.middleware.js";

const tripRouter = Router();
const tripImage = multer({ storage });

tripRouter.post( "/", tripImage.single("image"), verifyAccessToken, addTrip);
tripRouter.get("/", verifyAccessToken, getAllTripsByUser);
tripRouter.get("/:tripId", verifyAccessToken, getTripById);
tripRouter.get("/destinations/:tripId", verifyAccessToken, getAllDestination);
tripRouter.patch("/:tripId", tripImage.single("image"), verifyAccessToken, updateTrip);
tripRouter.delete("/:tripId/:imageFilename", verifyAccessToken, deleteTrip);

export default tripRouter;