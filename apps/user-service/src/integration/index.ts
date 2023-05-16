// Description: User Data Access Layer
import { User } from "../models/user";

export async function GetUsers() {
  const users = await User.find();
  console.log("users", users);
  return users;
}

export async function CreateUser(data: any) {
  const user = await User.create(data).catch((error) => {
    return null;
  });
  return user;
}
