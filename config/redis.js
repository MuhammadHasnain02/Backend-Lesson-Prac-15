// =========== Steps For Redis Cloud ===================
// Step #1 -> Get REDIS_CLOUD_URL in Redis Cloud Dashboard 
// Step #2 -> npm i redis
// Step #3 -> Create redis client instance
// Step #4 -> Connect to redis cloud
// Step #5 -> Cache data in redis cloud for 10 sec -> /posts 
// Step #6 -> Get data from redis cloud
// Step #7 -> delete data from redis cloud -> /posts

// ------------------------------------------------------

import { createClient } from "redis";
import dotenv from "dotenv";
dotenv.config();

const client = createClient({
  url: process.env.REDIS_CLOUD_URL,
});

// Error handling
client.on("error", (err) => {
  console.log("❌ Redis Error:", err);
});

// Connect function
export const connectRedis = async () => {
  try {
    await client.connect();
    console.log("✅ Redis Connected Successfully");
  } catch (error) {
    console.log("❌ Redis Connection Failed:", error);
  }
};

// Disconnect function
export const disconnectRedis = async () => {
  try {
    await client.disconnect();
    console.log("✅ Redis Disconnected Successfully");
  } catch (error) {
    console.log("❌ Redis Disconnection Failed:", error);
  }
};

export default client;