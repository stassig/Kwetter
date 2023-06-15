import { User } from "../types/user";

const URL = process.env.NEXT_PUBLIC_URL || "http://localhost:3000";
const GATEWAY_URL =
  process.env.NEXT_PUBLIC_GATEWAY_URL || "http://localhost:8080";

export const fetchUsers = async (): Promise<User[]> => {
  const tokenResponse = await fetch(`${URL}/api/auth/token`);
  const tokenData = await tokenResponse.json();

  const response = await fetch(`${GATEWAY_URL}/user`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + tokenData,
    },
  });

  const users = await response.json();
  return users;
};

export const checkIfUserExists = async (username: string): Promise<boolean> => {
  const tokenResponse = await fetch(`${URL}/api/auth/token`);
  const tokenData = await tokenResponse.json();

  const response = await fetch(`${GATEWAY_URL}/user/check/${username}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + tokenData,
    },
  });

  const { exists } = await response.json();
  return exists;
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

export const getUserById = async (id: string): Promise<User> => {
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
