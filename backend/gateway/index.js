const express = require("express");
const cors = require("cors");
const proxy = require("express-http-proxy");
const {
  USER_SERVICE,
  CUSTOMER_SERVICE,
  ENROLLMENT_SERVICE,
  COURSE_SERVICE,
} = require("./config");

const app = express();
app.use(cors());
app.use(express.json());

console.log(COURSE_SERVICE);
app.use("/users", proxy(USER_SERVICE));
app.use("/customers", proxy(CUSTOMER_SERVICE));
app.use("/enrollment", proxy(ENROLLMENT_SERVICE));
app.use("/courses", proxy(COURSE_SERVICE));

app.listen(8880, () => {
  console.log("Gateway running on #8880");
});
