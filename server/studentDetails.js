const mongoose = require("mongoose");

const StudentDetailsSchema = new mongoose.Schema(
    {
        id: String,
        name: String,
        group: String,
    },
    {
        collection: "StudentInfo",
    }
);

mongoose.model("StudentInfo", StudentDetailsSchema);