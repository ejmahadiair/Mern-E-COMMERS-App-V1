//external imports
const mongoose = require("mongoose");
//

const connectDatabase = () => {
  try {
    mongoose
      .connect(process.env.DB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then((data) => {
        console.log(`mongodb connected with server: ${data.connection.host}`);
      });
  } catch (e) {
    console.log("Problem in database connection e: ", e);
  }
};

module.exports = connectDatabase;
