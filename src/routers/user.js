const express = require("express");
const multer = require("multer");
const sharp = require("sharp");

const User = require("../models/user");
const router = new express.Router();

const upload = multer({
  limits: {
    fileSize: 1000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error("Please Upload an Image"));
    }
    cb(undefined, true);
  },
});

router.post("/register", upload.single("idCard"), async (req, res) => {
  let user = new User(req.body);
  try {
    const buffer = await sharp(req.file.buffer)
      .resize({ width: 250, height: 250 })
      .png()
      .toBuffer();
    user.idCard = buffer;
    let result = await user.save();
    result.idCard = undefined;
    res.send(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/:id/avatar", async (req, res) => {
  try {
    let user = await User.findOne({ _id: req.params.id });

    if (!user) {
      throw new Error("user doesn't exist");
    }

    res.set("Content-Type", "image/png");
    res.send(user.idCard);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/verify", async (req, res) => {
  try {
    let user = await User.findOne({ email: req.query.email });

    if (user) {
      res.json({ exists: true });
    } else {
      res.json({ exists: false });
    }
  } catch (error) {
    res.send(400).json({ error: error.message });
  }
});

module.exports = router;
