import Trip from '../models/trip.model.js';
import { asyncHandler } from '../middleswares/error.middleware.js';
import { cloudinary } from '../config/storage.js';

// add new Trip 
const addTrip = asyncHandler(async (request, response) => {
  const tripDetails = request.body;
  let newTrip;

  if( request.file ){
    const { path, filename } = request.file;
    newTrip = new Trip({
      ...tripDetails,
      image: { path, filename },
    });
  } else {
    newTrip = new Trip(tripDetails)
  }

  await newTrip.save();

  response.status(201).send({
    message: "New trip has been added.",
    date: newTrip,
  });
});

// Trip list
const getAllTripsByUser = asyncHandler(async (request, response)=>{
  const { userId } = request.body;
  
  const trips = await Trip.find({ userId: userId });

  response.status(200).send({
    message: `${userId}'s list of Trips.`,
    data: trips,
  });
});

// Trip
const getTripById = asyncHandler(async (request, response)=>{
  const { tripId } = request.params;

  const trip = await Trip.findOne({ _id: tripId });

  if (!trip) {
    response.status(404);
    throw new Error("Trip no found.");
  } else {
    response.status(200).send({
      message: "Trip details",
      data: trip,
    });
  }
});

// edit Trip
const updateTrip = asyncHandler(async (request, response) => {
  const { tripId } = request.params;
  let updatedDetails = request.body;
  let prevImage = {};

  if (request.file) {
    const { path, filename } = request.file;
    updatedDetails = { image: { path, filename }};
    if(prevImage.image !== undefined){
      prevImage = await Trip.findOne({ _id: tripId }).select('image.filename');
    }
  }

  const { matchedCount } = await Trip.updateOne({ _id: tripId }, {$set:updatedDetails});

   if(!matchedCount){
    response.status(404).send({ message: "Trip does not exist." });
   } else {
    if(prevImage.image !== undefined){
      await cloudinary.uploader.destroy(prevImage.image.filename);
    }

    const updatedTrip = await Trip.findOne({ _id: tripId});

    response.status(200).send({
      message: "Trip has been updated.",
      data:  updatedTrip
    });
   }
});

// remove Trip
const deleteTrip = asyncHandler(async (request, response) => {
  const { tripId, imageFilename } = request.params;

  const { deletedCount } = await Trip.deleteOne({ _id: tripId });
  if (!deletedCount) {
    response.status(500);
    throw new Error("Something went wrong while deleting the Trip.");
  } else {
   await cloudinary.uploader.destroy(`travel-logs/${imageFilename}`);

    response.status(204).send();
  }
});

export { addTrip, getAllTripsByUser, getTripById, updateTrip, deleteTrip };