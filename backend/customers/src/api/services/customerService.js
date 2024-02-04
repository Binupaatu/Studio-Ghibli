const Customer = require("../../models/customerModel");
const Joi = require("joi");
const axios = require("axios");
const fs = require('fs/promises');
class CustomerService {
  async createCustomer(data) {
    try {
    const customer = await Customer.create(this.extractCustomerFields(data));
      return customer;
    }catch (error) {
      throw new Error(error.message);
    }
  }
  async viewCustomer() {
  const customerDetails = await Customer.findAll({
    attributes:['id',"user_id",'full_name','phone_no','area_of_interests',"status",'created_at','updated_at']
});
return customerDetails
}
  // Extracts course fields from data
  extractCustomerFields(data) {
    return {
      user_id: data.user_id,
      full_name: data.full_name,
      phone_no: data.phone_no,
      area_of_interests: data.area_of_interests,
      status: data.status,
  } ;
}
async deleteCustomer(id) {
try {
  const customerdelete=await Customer.update({
    status:0
  },{
      where:{
          user_id: id
      }
  });

  return customerdelete
}catch{
  throw new Error(error.message);
}
}
async updateCustomer(customerDetail,userId) {
try{
  console.log("test")
  const userupdate=await Customer.update({
    full_name:customerDetail.full_name,
    phone_no:customerDetail.phone_no,
    area_of_interests:customerDetail.area_of_interests
  },{
    where:{
      user_id: userId
    }
  });
  return userupdate;
}catch{
  throw new Error(error.message);
}
}
}
module.exports = CustomerService;
