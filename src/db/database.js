const mongoose = require("mongoose");

mongoose
  .connect(
    `mongodb+srv://${process.env.USERNAME}:${process.env.PASSWORD}@cluster0.utv8p.mongodb.net/Cafeteria?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    }
  )
  .then(() => {
    console.log("connected to database");
  })
  .catch((e) => {
    console.log(`error : ${e.message}`);
  });
