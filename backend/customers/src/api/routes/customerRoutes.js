const express = require("express");
const router = express.Router();
const customerController = require("../controllers/customerController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/", customerController.createCustomer);

router.get("/", customerController.viewCustomer);
// DELETE /customer/:id - Delete a customer
router.delete("/:id", customerController.deleteCustomer);
// UPDATE /customer/:id - update a customer
router.put("/:id", customerController.updateCustomer);
module.exports = router;