import express, { Express, Request, Response } from "express";
import { MONGO_DB_CONNECTION_URL } from "./resources/values";
import router from "./routes/routes";
import { connect } from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";

/*
 * Load up and parse configuration details from
 * the `.env` file to the `process.env`
 * object of Node.js
 */
dotenv.config();

connect(MONGO_DB_CONNECTION_URL).then(() => {
  console.log("MongoDB connected")
})

/*
 * Create an Express application and get the
 * value of the PORT environment variable
 * from the `process.env`
 */
const app: Express = express();
const port = process.env.PORT || 3000;

console.log(`\n\n\n ----- App Fresh Start -----`)

/* Define a route for the root path ("/")
 using the HTTP GET method */
app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to QuickChat");
});

app.use(cors({ origin: "*" }));

/* Start the Express app and listen
 for incoming requests on the specified port */
app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

app.use("/public", express.static(path.join("", __dirname, "..", "storage")));

app.use("/request", router);


export default app;