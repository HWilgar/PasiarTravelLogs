import { Schema, model } from 'mongoose';

const tripSchema =  new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User ID is required."],
    },
    name: {
      type: String,
      required: [ true, "Name field is required." ]
    },
    date: {
      type: String,
      required: [ true, "Date field is required." ]
    },
    image: {
      path:{
        type: String,
      },
      filename: {
        type: String,
      },
    },
    deleted_at: {
      type: String,
    },
    is_deleted: {
      type: Boolean,
    },
  },
  {
    timestamps: true,
  }
);

const Trip = model("Trip", tripSchema);
export default Trip;