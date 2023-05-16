// Description: User Data Access Layer
import { PrismaClient } from "db-user";
const prisma = new PrismaClient();

export async function GetUsers() {
  const users = await prisma.user.findMany();
  return users;
}

export async function CreateUser(data: any) {
  const user = await prisma.user
    .create({
      data: data,
    })
    .catch(() => {
      return null;
    });
  return user;
}
