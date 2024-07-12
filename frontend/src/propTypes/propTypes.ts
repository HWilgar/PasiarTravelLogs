export type Destination = {
  name: string;
  location: Array<number>;
  visited: boolean;
  activities: Array<string>;
  tripId: string;
  _id: string;
}

export type Trip = {
  name: string;
  date: string;
  image: Image;
  _id: string;
}

export type Image = { 
  filename: string; 
  path: string 
}

export type UserData = {
  name: string;
  password: string;
  email: string;
}