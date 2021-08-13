const User = require("../models/userModel");

const bcrypt = require("bcryptjs");

exports.signUp = async (req, res) => {
  const { username, password } = req.body;
  try {
    const hashpassword = await bcrypt.hash(password, 12);
    const newUser = await User.create({
      username,
      password: hashpassword,
    });
    req.session.user = newUser;
    res.status(201).json({
      status: "Success",
      data: {
        user: newUser,
      },
    });
  } catch (e) {
    // placeholder
    res.status(400).json({
      status: "Something went wrong",
    });
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.find({ username });

    if (!user) {
      res.status(404).json({ status: "Fail", message: "User not found" });
    }

    const exist = await bcrypt.compare(password, user[0].password);

    if (exist) {
      req.session.user = user;
      res.status(200).json({
        status: "Success",
      });
    } else {
      res.status(400).json({
        status: "Fail",
        message: "Incorrent username or password",
      });
    }
  } catch (e) {
    // placeholder
    console.error(e);
    res.status(400).json({
      status: "Something went wrong",
    });
  }
};
