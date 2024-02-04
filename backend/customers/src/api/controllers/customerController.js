const customerService = require("../services/customerService");
const customerValidationSchema = require("../validations/customerSchema");
const service = new customerService();
const Joi = require("joi");

const CustomerController = {
  /**
   * This function validate the given request and trigger the Enrollment Service
   * @param {*} req
   * @param {*} res
   * @returns JsonResponse
   */
  async createCustomer(req, res) {
    
    const { error } = customerValidationSchema.validate(req.body);

    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    else {
      try {
        const customer = await service.createCustomer(req.body);
        res.status(201).send({
          message: "customer has been Created successfully",
          data: customer,
        });
      } catch (error) {
        res
          .status(500)
          .send({ message: "Error creating customer", error: error.message });
      }
    }
  },
  async viewCustomer(req, res) {
      try {
        const customer = await service.viewCustomer();
        res.status(201).send({
          message: "customer has been fetched successfully",
          data: customer,
        });
      } catch (error) {
        res
          .status(500)
          .json({ message: error.message });
      }
  },
  async deleteCustomer(req, res) {
    try {
      const userId = req.params.id;
      const customer = await service.deleteCustomer(userId);
      res.status(200).send({ message: `customer ${customer} deleted successfully` });
    } catch (error) {
      res
        .status(500)
        .json({ message: error.message });
    }
  },
  async updateCustomer(req, res) {
    try {
      const userId = req.params.id;
      const customer = await service.updateCustomer(req.body,userId);
      res.status(200).send({ message: `customer ${customer} update successfully`,Data:req.body });
    } catch (error) {
      res
        .status(500)
        .json({ message: error.message });
    }
  },
  
};

module.exports = CustomerController;