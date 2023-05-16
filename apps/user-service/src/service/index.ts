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
