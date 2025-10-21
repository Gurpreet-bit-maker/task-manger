let express = require("express");
let mongoose = require("mongoose");

let cors = require("cors");
require("dotenv").config();
let app = express();

app.use(cors());
app.use(express.json());

const UserTask = require("./models/schema.js");

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
//* route add task
app.post("/add", async (req, res) => {
  try {
    let taskAdded = await UserTask.create(req.body);
    console.log(taskAdded);
    res.json(taskAdded);
    console.log(`added this ${taskAdded}`);
  } catch (error) {
    console.log(error);
  }
});
//* route for all task

app.get("/users", async (req, res) => {
  try {
    let data = await UserTask.find();
    res.json(data);
  } catch (error) {}
});
//* route for update one task
app.put("/users/:id", async (req, res) => {
  try {
    let id = req.params.id;
    let updatedObj = req.body;
    let result = await UserTask.findByIdAndUpdate(id, updatedObj, {
      new: true,
    });
    res.json(result);
    console.log(`updated this ${result}`);
  } catch (error) {
    res.status(500).json({ message: "error server" });
  }
});

app.put("/users/:id", async (req, res) => {
  try {
    let id = req.params.id;
    let updatedTask = req.body;
    let result = await UserTask.findByIdAndUpdate(id, updatedTask);
    res.json(result);
    console.log(result);
  } catch (error) {
    console.log(error);
  }
});

//*route for delete one task
app.delete("/users/:deleteId", async (req, res) => {
  let deleteId = req.params.deleteId;
  try {
    let deletedTask = await UserTask.findByIdAndDelete(deleteId);
    res.json(deletedTask);
    console.log(`deleted this ${deletedTask}`);
  } catch (error) {
    console.log(error);
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
