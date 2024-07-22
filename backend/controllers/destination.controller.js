import Destination from '../models/destination.model.js';
import { asyncHandler } from '../middleswares/error.middleware.js';

// customer list (admin)
const getAllDestination = asyncHandler(async (request, response)=>{
  const { tripId } = request.params;
  
  const destinations = await Destination.find({ tripId: tripId });
  if (!destinations) {
    response.status(400);
    throw new Error("Not found");
  } else {
    response.status(200).send({
      message: "Destination List",
      data: destinations,
    });
  }
});

const getDestination = asyncHandler(async (request, response)=>{
  const { desId } = request.params;
  
  const destination = await Destination.findOne({ _id: desId });
  if (!destination) {
    response.status(400);
    throw new Error("Not found");
  } else {
    response.status(200).send({
      message: "Destination Details",
      data: destination,
    });
  }
});

// add new Destination
const addDestination = asyncHandler(async (request, response) => {
  const destinationDetails = request.body;

  let newDestination = new Destination(destinationDetails);

  await newDestination.save();

  response.status(201).send({
    message: "New Destination has been added.",
    date: newDestination,
  });
});

// update Destination
const updateDestination = asyncHandler(async (request, response) => {
  const { desId } = request.params;
  let updatedDetails = request.body;

  const { matchedCount } = await Destination.updateOne({ _id: desId }, {$set:updatedDetails});

   if(!matchedCount){
    response.status(404).send({ message: "Trip does not exist." });
   } else {

    const updatedDestination = await Destination.findOne({ _id: desId});

    response.status(200).send({
      message: "Trip has been updated.",
      data:  updatedDestination
    });
   }
});

const deleteDestination = asyncHandler(async (request, response) => {
  const { desId } = request.params;

  const { deletedCount } = await Destination.deleteOne({ _id: desId });
  if (!deletedCount) {
    response.status(500);
    throw new Error("Something went wrong while deleting the Trip.");
  } else {
    response.status(204).send();
  }
});

export { getAllDestination, addDestination, updateDestination, getDestination, deleteDestination };