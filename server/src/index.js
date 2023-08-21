import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { config as dotConfig } from "dotenv";
import { userRouter } from "./routes/users.js";
import { recipesRouter } from "./routes/recipes.js";

dotConfig();

const app = express();

app.use(express.json());
app.use(cors());

app.use("/auth", userRouter);
app.use("/recipes", recipesRouter);

const MONGO_URI = process.env.MONGO_URI || "MONGO_URI";

mongoose.connect(MONGO_URI);

app.listen(3001, () => {
	console.log("SERVER IS UP");
});
