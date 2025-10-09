let express = require("express");
let mongoose = require("mongoose");

let cors = require("cors");
require("dotenv").config();
let app = express();

app.use(cors());
app.use(express.json());

let UserTask = require("./models/schema.js");

// let dataObj = require("../todo-project/src/Components/Tasklist");
// console.log(dataObj)
async function main() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB Atlas");
  } catch (error) {
    console.log("❌ Cannot connect to MongoDB Atlas", error);
  }
}

// Run the connection
main();

app.post("/add", async (req, res) => {
  try {
    // let { task, des, comp } = req.body[0];
    // console.log(task,des,comp);
    let taskAdded = await UserTask.create(req.body);

    console.log(taskAdded);
  } catch (error) {
    console.log(error);
  }
});

app.get("/get", (req, res) => {
  res.send("working..");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
