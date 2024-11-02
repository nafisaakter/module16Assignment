import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import hpp from "hpp";
import * as path from "path";
import router from "./routes/api.js";
import {
  MONGODB_CONNECTION,
  PORT,
  MAX_JSON_SIZE,
  WEB_CACHE,
  URL_ENCODED,
  REQUEST_LIMIT_NUMBER,
  REQUEST_LIMIT_TIME,
} from "./app/config/config.js";
const app = express();
//global application middleware
app.use(cors());
app.use(express.json({ limit: MAX_JSON_SIZE }));
app.use(express.urlencoded({ extended: URL_ENCODED }));
app.use(hpp());
app.use(helmet());
app.use(cookieParser());

// rate limiter
const limiter = rateLimit({
  windowMs: REQUEST_LIMIT_TIME,
  max: REQUEST_LIMIT_NUMBER,
});
app.use(limiter);

// web cache
app.set("etag", WEB_CACHE);

// connect to mongodb

/*
you need to connect to your mongodb database using the mongoose.connect() method.
*/

// set API routes
app.use("/api", router);

// set Application storage
app.use(express.static("storage"));

// Run your express BACKEND project

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
