// Description: User Service Layer

import * as prisma from "../integration/index";

export async function GetUsers() {
  const users = await prisma.GetUsers();

  return users;
}

export async function CreateUser(data: any) {
  const user = await prisma.CreateUser(data);

  return user;
}

export async function GetUserByUsername(username: string) {
  const user = await prisma.GetUserByUsername(username);
  return user;
}

export async function GetUserById(id: string) {
  const user = await prisma.GetUserById(id);
  return user;
}
