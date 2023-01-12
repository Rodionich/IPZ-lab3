const express = require("express");
const app = express();
const mongoose = require("mongoose");
const mysql = require("mysql2");
const cors = require("cors");
app.use(cors());
app.use(express.json());
require("./studentDetails");

const mongoUrl = "mongodb://mongo/student_database";

// localhost:27017

mongoose.set("strictQuery", false);
mongoose
  .connect(mongoUrl, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Connected to database Mongo");
  })
  .catch((e) => console.log(e));

const config = {
  host: "mysql",
  user: "user",
  password: "password",
  database: "lab3_mysql",
  port: "3306",
};

let conn = mysql.createConnection(config);

conn.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Connected to database MySQL");
  }
});

const Student = mongoose.model("StudentInfo");

app.get("/showAllStudents", async (req, res) => {
  try {
    const data = await Student.find({});
    res.send({ status: "ok", data });
  } catch (error) {
    console.log(error);
    res.send({ status: "error" });
  }
});

app.post("/addStudent", async (req, res) => {
  const { name, group, id } = req.body;
  try {
    const oldUser = await Student.findOne({ name });
    if (oldUser) {
      return res.json({ error: "Student Exists" });
    }
    await Student.create({
      id,
      name,
      group,
    });
    const sqlInsert = "INSERT INTO date_table (id, name) VALUES (?, ?)";
    conn.query(sqlInsert, [id, name], (err, result) => {
      if (err) {
        console.log(err);
      }
    });
    res.send({ status: "ok" });
  } catch (error) {
    console.log(error);
    res.send({ status: "error" });
  }
});

app.post("/deleteStudent", async (req, res) => {
  const { id } = req.body;
  try {
    await Student.deleteOne({
      id,
    });
    const sqlInsert = "DELETE FROM date_table WHERE id = ?";
    conn.query(sqlInsert, id, (err, result) => {
      if (err) {
        console.log(err);
      }
    });
    res.send({ status: "ok" });
  } catch (error) {
    // console.log(error);
    res.send({ status: "error" });
  }
});

app.listen(5000, () => {
  console.log("Server started on port 5000");
});
