const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
  fullname: {
    type: String,
    required: "full name is required",
  },
  orgName: {
    type: String,
    required: "organization name is required",
  },
  empId: {
    type: String,
    required: true,
    unique: true,
  },
  mobileNo: {
    type: String,
    requried: true,
  },
  email: {
    type: String,
    required: true,
    validate(value) {
      let isEmail = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(value);
      if (!isEmail) {
        throw new Error("please provide a valid email address");
      }
    },
    unique: true,
  },
  idCard: {
    type: Buffer,
    requried: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const user = model("User", UserSchema);

module.exports = user;
