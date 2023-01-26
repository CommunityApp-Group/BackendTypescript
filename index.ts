import express, {Express, Request, Response } from "express";
import "reflect-metadata";
import logger from "./src/utils/logger";
import dotenv from "dotenv";
import connectDB from "./src/database";
import { Server } from "socket.io";
import { ExpressPeerServer } from "peer";
import messageHandler from "./src/module/socket/messageHandler";
import { AppDataSource } from "./app-data-source";
import appRoutes from "./src/routes";
import http from "http";

dotenv.config();

AppDataSource
    .initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization:", err)
    })

const app: Express = express()
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});
const peerServer = ExpressPeerServer(server, {
  path: "/myapp",
});


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1", appRoutes);

const PORT = process.env.PORT || Number(8000)
console.log(PORT)

async function onListening() {
    console.log(`Listening on port ${PORT}`);
  }
  app.get("/", (_req: Request, res: Response) => {
    res.send("Community App Backend Server");
  });

// app.listen(PORT, onListening)

const onConnection = (socket: any) => {
  socket.on("disconnect", function () {
    console.log("user disconnected", socket.id  );
  });
  console.log("socket connected", socket.id)
  messageHandler(io, socket);
};

io.on("connection", onConnection);
peerServer.on("connection", (client: any) => {
  console.log(client.token, "connection");
});
peerServer.on("disconnect", (client: any) => {
  console.log(client, "disconnect");
});

app.listen(PORT, () => {
  // connectDB(),
  logger(module).error(`⚡️[server]: Server is running at port ${PORT}`);
    console.log(`server is running on ${PORT}`)
})

export { io };
