const express = require("express");
const app = express();
const userRouter = require("./routers/user");

require("./db/database");

app.use(express.json());

app.use("/", userRouter);

app.get("/test", (req, res) => {
  res.send("success");
});

app.listen(process.env.PORT, () => {
  console.log(`listening on port ${process.env.PORT}`);
});
