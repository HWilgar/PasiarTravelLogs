import { Schema, model } from 'mongoose';

const userSchema =  new Schema(
  {
    name: {
      type: String,
      required: [ true, "Email field is required." ],
    },
    email: {
      type: String,
      required: [ true, "Email field is required." ],
    },
    password: {
      type: String,
      required: [ true, "Password field is required." ],
    }
  },
  {
    timestamps: true,
  }
);

const User = model("User", userSchema);
export default User;