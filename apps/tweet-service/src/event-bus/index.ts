//!POST SERVICE

import amqp from "amqplib";

const QUEUE_NAME = "tweet-queue";

const URL = process.env.RABBITMQ_URL || "amqp://localhost:5672";

console.log(URL);

let channel: amqp.Channel, connection: amqp.Connection;

// Connect to RabbitMQ
export async function connectQueue() {
  try {
    connection = await amqp.connect(URL);
    connection.on("error", handleConnectionError);
    connection.on("close", handleConnectionClose);
    channel = await connection.createChannel();

    await channel.assertQueue(QUEUE_NAME);

    console.log("Connected to RabbitMQ");
  } catch (error) {
    handleConnectionError(error);
  }
}

function handleConnectionError(err: any) {
  console.error("RabbitMQ connection error:", err);
}

function handleConnectionClose() {
  console.log("RabbitMQ connection closed");
}

// Send data to RabbitMQ
export async function sendData(data: any) {
  try {
    if (!channel) {
      console.log("RabbitMQ channel not available. Reconnecting...");
      await connectQueue();
    }

    const message = JSON.stringify(data);

    await channel.assertQueue(QUEUE_NAME);
    await channel.sendToQueue(QUEUE_NAME, Buffer.from(message));

    console.log("Data sent to RabbitMQ");
  } catch (error) {
    console.error("Error while sending data to RabbitMQ:", error);
    throw error;
  }
}

// Close RabbitMQ connection
export async function closeConnection() {
  if (channel) {
    await channel.close();
  }
  if (connection) {
    await connection.close();
  }
}
