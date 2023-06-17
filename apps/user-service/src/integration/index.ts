// Description: User Data Access Layer
import { User } from "../models/user";

export async function GetUsers() {
  const users = await User.find();
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
  const user = await GetUserById(userId);
  const followUser = await GetUserById(followUserId);

  if (!user || !followUser) {
    return null;
  }

  user.following.push(followUser._id);
  followUser.followers.push(user._id);

  await Promise.all([user.save(), followUser.save()]);

  return user;
}

export async function UnfollowUser(userId: string, unfollowUserId: string) {
  const user = await GetUserById(userId);
  const unfollowUser = await GetUserById(unfollowUserId);

  if (!user || !unfollowUser) {
    return null;
  }

  const updatedUser = await User.findOneAndUpdate(
    { _id: userId, following: unfollowUser._id },
    { $pull: { following: unfollowUser._id } },
    { new: true }
  );

  if (updatedUser) {
    await User.findOneAndUpdate(
      { _id: unfollowUserId, followers: user._id },
      { $pull: { followers: user._id } }
    );
  }

  return updatedUser;
}

export async function GetUserByUserId(id: string) {
  const user = await User.findOne({ user_id: id });
  return user;
}
