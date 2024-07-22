import User from '../models/user.model.js';
import bcrypt from 'bcrypt';
import { createAccessToken } from '../middleswares/auth.middleware.js';
import { asyncHandler } from '../middleswares/error.middleware.js';

// signup (customer and admin)
const signup = asyncHandler(async (request, response) => {
  const { 
    name, 
    email, 
    password
  } = request.body;

  const isUserExist = await User.findOne({ email });

  if(isUserExist) {
    response.status(400);
    throw new Error("Email already exists.");
  } else {
    const hash = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hash
    });
    await newUser.save();

    response.status(201).send({
      message: "New user has been created.",
      data: newUser,
    });
  }
});

// signin (customer and admin)
const signin = asyncHandler(async (request, response) => {
  const { email, password } = request.body;

  const user = await User.findOne({ email });

  if (!user) {
    response.status(404);
    throw new Error("User does not exist.");
  } else {
    const isPasswordMatched = await bcrypt.compare(password, user.password);
  
    if (!isPasswordMatched) {
      response.status(404);
      throw new Error("Password didn't match.");
    } else {
      response.status(200).send({
        message: "Login successful.",
        data: {
          token: createAccessToken(user),
          name: user.name
        },
      });
    }
  }
});

// customer list (admin)
const getAllUsers = asyncHandler(async (request, response) => {
  const users = await User.find({
    $or: [
      { isDeleted: { $exists: false } }, 
      { isDeleted: false }
    ]
  });

  response.status(200).send({
    message: "List of Users",
    data: users,
  });

});

// customer profile view
const getUserById = asyncHandler(async (request, response) => {
  const { userId } = request.params;
  
  const user = await User.find({ _id: userId });

  if (!user) {
    response.status(404);
    throw new Error("User does not exist.");
  } else {
    response.status(200).send({
      message: "User's profile",
      data: user,
    });
  }
});

// edit profile (customer)
const updateUser = asyncHandler(async (request, response) => {
  const { userId } = request.params;
  let updatedDetails = request.body;

  const isUserExist = await User.findOne({
    email: updatedDetails.email,
    _id: { $ne: userId }
  });

  if (isUserExist) {
    response.status(400);
    throw new Error("Email already exists.");
  } else {

    if (updatedDetails.password){
      const hash = await bcrypt.hash(updatedDetails.password, 10);
      updatedDetails = {
        ...updatedDetails,
        password: hash,
      }
    }
  
    const { matchedCount } = await User.updateOne({ _id: userId }, {$set: updatedDetails});

    if (!matchedCount) {
      response.status(404).send({
        message: "User does not exist."
      });
    } else {
      const updatedProfile = await User.findOne({ _id: userId });

      response.status(200).send({
        message: "User profile has been updated.",
        data: updatedProfile,
      });
    }
  }
});

export { signup, signin, getAllUsers, updateUser, getUserById };