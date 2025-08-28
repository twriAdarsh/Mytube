import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const rawUri = process.env.MONGODB_URI || "";
const rawDb = process.env.DB_NAME || "test";

// remove trailing slashes from URI and leading slashes from DB name
const baseUri = rawUri.replace(/\/+$/, "");
const dbName = rawDb.replace(/^\/+/, "");

// build final uri (add options as needed)
const MONGO_URI = `${baseUri}/${dbName}?retryWrites=true&w=majority`;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

export default function connectDb() {
  return mongoose
    .connect(MONGO_URI, options)
    .then((conn) => {
      console.log("MongoDB connected !! DB HOST:", conn.connection.host);
      console.log("MongoDB DB name:", conn.connection.name);
      return conn;
    })
    .catch((err) => {
      console.error("MongoDB connection error:", err);
      throw err;
    });
}

