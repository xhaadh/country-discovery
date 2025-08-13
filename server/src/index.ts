import express from "express";
import cors from "cors";
import "express-async-errors";
import countriesRouter from "./routes/countriesRoute";
import { errorHandler } from "./middleware/errorHandler";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/countries", countriesRouter);

app.get("/", (req, res) => res.json({ message: "Country proxy running" }));

app.use(errorHandler);

const port = Number(process.env.PORT || 5000);
app.listen(port, () => {
  console.log(`Backend listening on http://localhost:${port}`);
});
