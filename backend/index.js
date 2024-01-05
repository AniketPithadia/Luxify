import express from "express";
import connectToMongoDB from "./database.js";
import http from "http";
import jwt from "jsonwebtoken";
import userRoutes from "./Routes/UserRoutes.js";
import authRoutes from "./Routes/AuthRoutes.js";
import cookieParser from "cookie-parser";
import listingRoutes from "./Routes/ListingRoutes.js";
import { WebSocketServer } from "ws";
const app = express();

app.use(express.json());
app.use(cookieParser());
const server = http.createServer(app);

server.listen(3000, () => {
  connectToMongoDB();
  console.log("Server started");
});
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/listing", listingRoutes);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

const wss = new WebSocketServer({ server });
wss.on("connection", (connection, req) => {
  function notifyAboutOnlinePeople() {
    [...wss.clients].forEach((client) => {
      client.send(
        JSON.stringify({
          online: [...wss.clients].map((c) => ({
            userId: c.userId,
            username: c.username,
          })),
        })
      );
    });
  }

  connection.isAlive = true;

  connection.timer = setInterval(() => {
    connection.ping();
    connection.deathTimer = setTimeout(() => {
      connection.isAlive = false;
      clearInterval(connection.timer);
      connection.terminate();
      notifyAboutOnlinePeople();
      console.log("dead");
    }, 1000);
  }, 5000);

  connection.on("pong", () => {
    clearTimeout(connection.deathTimer);
  });
  const cookies = req.headers.cookie.split("; ");
  if (cookies) {
    const tokenString = cookies.find((cookie) =>
      cookie.startsWith("access_token")
    );
    if (tokenString) {
      const token = tokenString.split("=")[1];
      if (token) {
        jwt.verify(token, process.env.JWT_SECRET, (err, userData) => {
          if (err) throw err;

          const { userId } = userData;
          connection.userId = userId;
          // connection.username = username;
        });
      }
    }
  }
  notifyAboutOnlinePeople();
});
