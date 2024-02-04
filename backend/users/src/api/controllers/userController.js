const userService = require("../services/userService");
const userValidationSchema = require("../validations/userSchema");

const UserController = {
  async createUser(req, res) {
  const { error } = userValidationSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  else {
    try {
      const user = await userService.createUser(req.body);
      res
        .status(201)
        .send({ message: "User created Successfully", user: req.body });
    } catch (error) {
      res
        .status(500)
        .send({ message: "Error creating user", error: error.message });
    }
  }
  },

  async getAllUsers(req, res) {
    try {
      const userList = await userService.getAllUsers();
      return res
      .send({
        message: "User has been fetched successfully",
        data: userList
      })
    }
    catch (error) {
      res
        .status(500)
        .send({ message: "User is empty"});
    }
  },

  async getUserById(req, res) {
    try {
      const userId = req.params.id;
      //Call Service Fuunction
      const user = await userService.getUserById(userId);
      if(!user)
      {
        res
        .status(500)
        .send({ message: "User is empty"});
      }
      else
      { res
        .send({
          message: "User has been fetched successfully",
          data: user
        })
      }
    }
    catch (error) {
      res
        .status(500)
        .send({ message: "User is empty"});
    }
  },
  async updateUser(req, res) {
    // Business logic for updating a user's details
    // Update user with the given ID in the database
    const userId = req.params.id;
    try
    {
    const user = await userService.updateUser(userId,req.body);
    res
      .status(200)
      .send({ message: `User ${userId} updated successfully`, user: req.body });
    }
    catch (error) {
      res
        .status(500)
        .send({ message: "User not found", error: error.message });
    }
  },

  async deleteUser(req, res) {
    // Business logic for deleting a user
    // Delete user with the given ID from the database
    const userId = req.params.id;
    try
    {
    const user = await userService.deleteUser(userId);
    res
      .status(200).send({ message: `User ${userId} deleted successfully` });
    }
    
    catch (error) {
    res
      .status(500)
      .send({ message: "User not found", error: error.message });
  }
},

  async loginUser(req, res) {
    // Business logic for user login
    // Authenticate user and issue a token/session
    res
      .status(200)
      .send({ message: "Login successful", token: "your_token_here" });
  },

  async logoutUser(req, res) {
    // Business logic for user logout
    // Invalidate the user's session/token
    try{
      const user = await userService.logoutUser(req);
      res
      .status(400)
      .json({msg: "Unable to logout"});
    }
    catch (error) {
      res
      .status(200)
      .send({ message: "Logout successful" });
    }
  },

  async getUserProfile(req, res) {
    // Business logic for getting a user's profile
    // Fetch user profile details from the database
    const userId = req.params.id;
    res.status(200).send({ message: `Profile of user ${userId}`, profile: {} });
  },

  async updatePassword(req, res) {
    // Business logic for updating a user's password
    // Update the password for the user with the given ID in the database
  const userId = req.params.id;
  try
    {
    const user = await userService.updatePassword(userId,req.body);
    res
      .status(200)
      .send({ message: `Password for user ${userId} updated successfully` });
    }
    catch (error) {
      res
        .status(500)
        .send({ message: "User not found", error: error.message });
    }

  },
};

module.exports = UserController;
