const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const router = require("./router");

const app = express();
const PORT = 5000;

mongoose.connect(
  "mongodb+srv://admin:admin123@cluster0-nekw3.mongodb.net/users?retryWrites=true&w=majority",
  { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true }
);
const db = mongoose.connection;

db.once("open", function () {
  console.log("Mongo Connected");
});
app.use(morgan("combined"));
app.use(express.json());
router(app);
app.get('/', (res, req)=> req.send("I'm working"))

app.listen(PORT, (err) =>
  console.log(err ? err : `App run on http://localhost:${PORT}`)
);
