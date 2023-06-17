import { User } from "../types/user";
import { UserData } from "../types/user_data";
import { updateFollowing, updateUnfollowing } from "./tweets";

const URL = process.env.NEXT_PUBLIC_URL || "http://localhost:3000";
const GATEWAY_URL =
  process.env.NEXT_PUBLIC_GATEWAY_URL || "http://localhost:8080";

export const fetchUsers = async (): Promise<UserData[]> => {
  const tokenResponse = await fetch(`${URL}/api/auth/token`);
  const tokenData = await tokenResponse.json();

  const response = await fetch(`${GATEWAY_URL}/user`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + tokenData,
    },
  });

  const users = await response.json();
  return users.collection;
};

export const checkIfUserExists = async (
  username: string
): Promise<UserData> => {
  const tokenResponse = await fetch(`${URL}/api/auth/token`);
  const tokenData = await tokenResponse.json();

  const response = await fetch(`${GATEWAY_URL}/user/check/${username}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + tokenData,
    },
  });

  const user = await response.json();
  return user;
};

export const createUser = async (data: any): Promise<User> => {
  const tokenResponse = await fetch(`${URL}/api/auth/token`);
  const tokenData = await tokenResponse.json();

  const response = await fetch(`${GATEWAY_URL}/user`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + tokenData,
    },
    body: JSON.stringify(data),
  });

  const user = await response.json();
  return user;
};

export const getUserById = async (id: string): Promise<UserData> => {
  const tokenResponse = await fetch(`${URL}/api/auth/token`);
  const tokenData = await tokenResponse.json();

  const response = await fetch(`${GATEWAY_URL}/user/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + tokenData,
    },
  });

  const user = await response.json();

  return user;
};

export const followUser = async (
  userId: string,
  followUserId: string
): Promise<User> => {
  const tokenResponse = await fetch(`${URL}/api/auth/token`);
  const tokenData = await tokenResponse.json();

  const response = await fetch(
    `${GATEWAY_URL}/user/${encodeURIComponent(
      userId
    )}/follow/${encodeURIComponent(followUserId)}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + tokenData,
      },
    }
  );

  const user = await response.json();

  if (response.ok) {
    await updateFollowing(userId, followUserId);
  }

  return user as User;
};

export const unfollowUser = async (
  userId: string,
  unfollowUserId: string
): Promise<User> => {
  const tokenResponse = await fetch(`${URL}/api/auth/token`);
  const tokenData = await tokenResponse.json();

  const response = await fetch(
    `${GATEWAY_URL}/user/${encodeURIComponent(
      userId
    )}/unfollow/${encodeURIComponent(unfollowUserId)}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + tokenData,
      },
    }
  );

  const user = await response.json();

  if (response.ok) {
    await updateUnfollowing(userId, unfollowUserId);
  }

  return user as User;
};
