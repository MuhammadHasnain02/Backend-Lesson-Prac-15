// Rate Limiter Example in Node.js with Express.js and Redis Cloud for caching data 
// Step #1 -> connect to redis cloud
// Step #2 -> cache data in redis cloud
// Step #3 -> get data from redis cloud
// Step #4 -> delete data from redis cloud

import express from "express";
import { rateLimiter } from "./middleware/rateLimiter.js";
import { connectRedis } from "./config/redis.js";

const app = express();

const startServer = async () => {
  await connectRedis();

  // Global limit
  app.use(rateLimiter(100, 60));

  // Routes
  app.get("/api/data", rateLimiter(5, 20), (req, res) => {
    res.json({
      success: true,
      message: "API working 🚀",
    });
  });

  // Public API (strict limit)
  // app.use("/api/public", rateLimiter(10, 60));

  // Login API (very strict)
  // app.use("/api/login", rateLimiter(3, 60));

  // Normal API
  // app.use("/api/data", rateLimiter(20, 60));

  app.listen(3000, () => {
    console.log("Server running on port 3000");
  });

};

startServer();
