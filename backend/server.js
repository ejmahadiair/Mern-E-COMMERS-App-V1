//external imports
const dotenv = require("dotenv");
const cloudinary = require("cloudinary");
//
//internal imports
const app = require("./app");
const connectDatabase = require("./config/database");
//

//Handllin Uncaught Exception
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Sutting down the server due to Uncaught Exception`);
  process.exit(1);
});

dotenv.config({ path: "backend/config/config.env" });
//database connection
connectDatabase();
//connect with cloudinary for upload
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDIINARY_API_SECRET,
});

const server = app.listen(process.env.PORT, () => {
  console.log(`Server working on http://localhost:${process.env.PORT}`);
});

//Unhandle promis Rejection
process.on("unhandledRejection", (err) => {
  console.log(`Error ${err.message}`);
  console.log(`Sutting down the server due to Unhandle Promise rijection`);
  server.close(() => {
    console.log("Server closed");
    process.exit(1);
  });
});
