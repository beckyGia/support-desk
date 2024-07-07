//Required Dependencies
import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import { userRoutes } from "./routes/userRoutes.js";
import { ticketRoutes } from "./routes/ticketRoutes.js";
import { errorHandler } from "./middleware/errorMiddleware.js";
import { connectDB } from "./config/db.js";
import path from "path";
import { fileURLToPath } from "url";

// Set up __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configure dotenv to load variables from the .env file
dotenv.config({ path: path.resolve(__dirname, "./config/.env") });

//Connect to database
connectDB();

//SET UP PORT:
const PORT = process.env.PORT || 8000;

const app = express();

//MIDDLEWARE (BODY PARSER) - get data from the req.body:
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/api/users", (req, res) => {
  res.status(201).json({ message: "Welcome to the support desk API" });
});

//Routes
app.use("/api/users", userRoutes);
app.use("/api/tickets", ticketRoutes);

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
