import { Button } from "ui";
import { PrismaClient } from "database";

const client = new PrismaClient();

export default function Web() {
  return (
    <div>
      <h1>Web</h1>
      <Button />
    </div>
  );
}
