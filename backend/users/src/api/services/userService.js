const User = require("../../models/userModel");
const bcrypt =require("bcrypt");
const axios = require('axios');
const { error } = require("../validations/userSchema");
class UserService {
async createUser(userData) {
  const { username, password,full_name,email_id,phone_no,area_of_interests,role,status} = userData;
  /*try {*/
  const userexist =  await User.findOne({
      where: {
        username : username,
        email_id : email_id,
        status : 1
    }
  });

  if(!userexist){
    const hashpassword= await bcrypt.hash(password,process.env.HASH_VALUE);
    const UserDetail=await User.create({
        username:username,
        email_id :email_id,
        password:hashpassword,
        role:role,
        status:status
    });
    const user_id = UserDetail.id;
   
    //call customer service
    const res = await axios.post('http://localhost:8880/customers/',
    {
      user_id,
      full_name,
      phone_no,
      area_of_interests,
      status
    });
  }
  else
  {
    throw new Error("User Exist");
  }

  /*}
  catch (error) {
    return error.message;
  }*/
  }

async getAllUsers() {
  const user = await User.findAll({
      attributes:['id','username','email_id','password','role']
  });

  const customer = await axios(
    {
      method:'get',
      url:"http://localhost:8880/customers/"
    });
 
    const users = JSON.parse(JSON.stringify(user));
    const customers = JSON.parse(JSON.stringify(customer.data.data));
    const userDetail = users.map((users) => {
    const customerDetail = customers.find((c) => c.user_id === users.id);
      return {
        ...users,
        ...customerDetail
      };
    });
  return userDetail;
  }

async getUserById(id) {
  try {
  const user = await User.findAll({
    attributes:['id','username','email_id','password','role'],
    where : {
      id:id
    }
});

if(user.length==0)
{
  return
}
const customer = await axios(
  {
    method:'get',
    url:"http://localhost:8880/customers/"
  });

  const users = JSON.parse(JSON.stringify(user));
  const customers = JSON.parse(JSON.stringify(customer.data.data));
  const userDetail = users.map((users) => {
  const customerDetail = customers.find((c) => c.user_id === users.id);
    return {
      ...users,
      ...customerDetail
    };
  });
  return userDetail;
}catch{
  throw new Error(error.message);
}
  }

async updateUser(id,newdata) {
  const { full_name,email_id,phone_no,area_of_interests} = newdata;
  try{
    const userupdate=await User.update({
      email_id:email_id
    },{
      where:{
          id: id
      }
    });

  const res = await axios.put('http://localhost:8880/customers/'+id,
  {
    full_name,
    phone_no,
    area_of_interests,
  });
  return userupdate;
}catch{
    throw new Error(error.message);
  }
  }

async deleteUser(id) {
  try {
  const userdelete=await User.update({
    status:0
  },{
      where:{
          id: id
      }
  });
  const res = await axios.delete('http://localhost:8880/customers/'+id);
  console.log("customer==>"+res)
  return userdelete;
}catch{
  throw new Error(error.message);
}

}

async logoutUser(id) {
    req.session.destroy((err)=>{
      return res;
    });
  }

async updatePassword(id,user) {
    console.log(id,user)
    const hashpassword= await bcrypt.hash(user.password,10);
    const updatepwd=await User.update({
      password:hashpassword
  },{
      where:{
          id: id
      }
  });

  return updatepwd;
  }
}

module.exports = new UserService();
