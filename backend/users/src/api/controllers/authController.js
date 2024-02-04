const authService = require("../services/authService");

const authController = {
  async authenticateUser(req, res) {
    try {
      const { username,email_id, password } = req.body;
      const token = await authService.authenticateUser(username,email_id, password);
      res.status(200).json({ message: "Authentication successful", token });
    } catch (error) {
      res.status(401).json({ message: "Auth Controller " + error.message });
    }
  },
};

module.exports = authController;
