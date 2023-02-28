const express = require("express");
const mongoose = require("mongoose");
// const dotenv = require("dotenv"); this is not the right way. should be in package.json
const todoRoutes = require("./routes/todo");

// dotenv.config();
const PORT = process.env.PORT;
const DATABASE_URL = process.env.DATABASE_URL;

mongoose
  .connect(DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Database connection successful");
    const app = express();

    app.use(express.json());
    app.get("/", (req, res) => res.json({ message: "server is running" }));
    app.use("/todo", todoRoutes);

    app.listen(PORT, () => console.log(`server is running port at ${PORT}`));
  })
  .catch((err) => {
    console.log("Database connection failed");
    console.log(err);
  });
