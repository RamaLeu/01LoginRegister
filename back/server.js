const mongoose = require("mongoose");
const app = require("./app");
// const dotenv = require("dotenv");
// dotenv.config();

const DB =
  process.env.MONGO_DB;
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to DB");
  });

const port = process.env.PORT || 3001
app.listen(port, () => {
  console.log(`App running on port ${port}`);
}); 