//!USER SERVICE

import amqp from "amqplib";
import { handleFollow, handleUnfollow, handleCreateTweet } from "../service";

const QUEUE_NAME = "tweet-queue";

let channel: amqp.Channel, connection: amqp.Connection;

const URL = process.env.RABBITMQ_URL || "amqp://localhost:5672";

export async function connectQueue() {
  try {
    connection = await amqp.connect(URL);
    channel = await connection.createChannel();

    await channel.assertQueue(QUEUE_NAME);

    channel.consume(QUEUE_NAME, async (msg) => {
      if (msg !== null) {
        const message = JSON.parse(msg.content.toString());
        console.log(`Received message!`);
        console.log(`Type:`, message.type);

        // Service layer logic below
        switch (message.type) {
          case "Follow":
            await handleFollow(message.data);
            break;
          case "Unfollow":
            await handleUnfollow(message.data);
            break;
          case "CreateTweet":
            await handleCreateTweet(message.data);
            break;
          default:
            console.error(`Unknown message type: ${message.type}`);
        }
        channel.ack(msg);
      }
    });

    console.log("Connected to RabbitMQ");
    return true;
  } catch (error) {
    console.error("RabbitMQ connection error:", error);
    return false;
  }
}

async function retryConnection(retryInterval: number) {
  let isConnected = await connectQueue();

  while (!isConnected) {
    console.log(`Retrying connection in ${retryInterval / 1000} seconds`);
    await new Promise((resolve) => setTimeout(resolve, retryInterval));
    isConnected = await connectQueue();
  }
}

export async function startListening(retryInterval = 5000) {
  try {
    await retryConnection(retryInterval);
  } catch (error) {
    console.error("Error while starting to listen:", error);
  }
}

export async function closeConnection() {
  if (channel) {
    await channel.close();
  }
  if (connection) {
    await connection.close();
  }
}
