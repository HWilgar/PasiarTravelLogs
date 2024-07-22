import { Schema, model } from 'mongoose';

const destinationSchema =  new Schema(
  {
    tripId: {
      type: Schema.Types.ObjectId,
      ref: "Trip",
      required: [true, "Trip ID is required."],
    },
    name: {
      type: String,
      required: [ true, "Name field is required." ]
    },
    location: {
      type: Array,
      required: [ true, "Location field is required." ]
    },
    activities: {
      type: Array,
    },
    visited: {
      type: Boolean,
    },
  },
  {
    timestamps: true,
  }
);

const Destination = model("Destination", destinationSchema);
export default Destination;