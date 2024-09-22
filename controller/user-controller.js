const User = require("../models/user-model");
const Address = require("../models/address-model");

const submit = async (req, res) => {
  try {
    const { name, vill, post, state, pincode } = req.body;

    if (!name || !vill || !post || !state || !pincode) {
      return res
        .status(400)
        .json({ message: "Please provide all the required fields" });
    }

    let user = await User.findOne({ name });

    if (!user) {
      user = await User.create({
        name,
        addresses: [{ vill, post, state, pincode }],
      });
    } else {
      user.addresses.push({ vill, post, state, pincode });
      await user.save();
    }

    const address = await Address.create({
      vill,
      post,
      state,
      pincode,
      userId: user._id,
    });

    res.status(201).json({
      message: "User and address updated successfully",
      userId: user._id,
      addressId: address._id,
      addressCount: user.addresses.length,
    });
  } catch (error) {
    console.error("Error whie posting the data:", error);
    res
      .status(500)
      .json({ error: "An error occurred while processing the request" });
  }
};

const getUser = async (req, res) => {
  try {
    const user = await User.findOne({ name: req.params.name });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.error("Error in /user route:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching user data" });
  }
};

module.exports = { submit, getUser };
