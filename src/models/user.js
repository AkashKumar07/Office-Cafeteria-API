const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new Schema({
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
  password: {
    type: String,
    minlength: 7,
    required: true,
    trim: true,
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

userSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();

  delete userObject.password;

  return userObject;
};

userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = await jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
  return token;
};

userSchema.statics.findByCredentials = async (email, password) => {
  const u = await user.findOne({ email });

  if (!u) {
    throw new Error("unable to login");
  }
  const isMatch = await bcrypt.compare(password, u.password);
  if (!isMatch) {
    throw new Error("unable to login");
  }

  return u;
};

userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

const user = model("User", userSchema);

module.exports = user;
