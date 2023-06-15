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

export async function GetUserByUsername(username: string) {
  const user = await User.findOne({ username });
  return user;
}

export async function GetUserById(id: string) {
  const user = await User.findById(id);
  return user;
}

export async function FollowUser(userId: string, followUserId: string) {
  const user = await User.findByIdAndUpdate(
    userId,
    { $push: { following: followUserId } },
    { new: true }
  );
  return user;
}

export async function UnfollowUser(userId: string, unfollowUserId: string) {
  const user = await User.findByIdAndUpdate(
    userId,
    { $pull: { following: unfollowUserId } },
    { new: true }
  );
  return user;
}
