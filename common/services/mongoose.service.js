const mongoose = require("mongoose");
let count = 0;

mongoose.set("strictQuery", true);

const connectWithRetry = () => {
  console.log("mongodb is connecting ...")
  mongoose
    .connect(
      "mongodb+srv://amarjeet:pRxovl0TSsV3lTEm@cluster0.rthihii.mongodb.net/test",
      {
        useNewUrlParser: true,
      }
    )
    .then(() => {
      console.log("MongoDB is connected");
    })
    .catch((err) => {
      console.log(
        "MongoDB connection unsuccessful, retry after 5 seconds. ",
        ++count
      );
      setTimeout(connectWithRetry, 1000);
    });
};

connectWithRetry();

exports.mongoose = mongoose;
