const jwt = require("jsonwebtoken");
const User = require("../../models/userModel");
const { use } = require("../routes/userRoutes");
const bcrypt= require("bcrypt");
const secretKey = "1234567890";
const Op = require("sequelize")

const authService = {
  async authenticateUser(username,email_id, password) {
  const user = await User.findOne({
      where: {
          username: username,
          status:1
        }
    });
    
  const users = await User.findOne({
      where: {
          email_id: email_id,
          status:1
        }
    });
    
   
    if (user || users)
    {
     if(user) {
      match = await bcrypt.compare(password, user.password);
    }
     else if(users) {
      match = await bcrypt.compare(password, users.password);
    }
     if (!match) {
      throw new Error("Invalid credentials"); }
      else if(user){
        const token = jwt.sign({ userId: user.UserID}, secretKey, {
          expiresIn: "1h",
        });
        return token;
     
      }
      else if(users)
      {
        const token = jwt.sign({ userId: users.UserID }, secretKey, {
          expiresIn: "1h",
        });
        return token;
     
      }
    }
    if (!user && !users)
    {
      throw new Error("User not found");
    }
  },
};

module.exports = authService;
