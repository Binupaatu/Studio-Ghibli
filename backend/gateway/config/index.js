const dotEnv = require("dotenv");

if (process.env.NODE_ENV !== "prod") {
  const configFile = `./.env.${process.env.NODE_ENV}`;
  dotEnv.config({ path: configFile });
} else {
  dotEnv.config();
}

module.exports = {
  PORT: process.env.PORT,
  USER_SERVICE: process.env.USER_SERVICE,
  COURSE_SERVICE: process.env.COURSE_SERVICE,
  CUSTOMER_SERVICE: process.env.CUSTOMER_SERVICE,
  ENROLLMENT_SERVICE: process.env.ENROLLMENT_SERVICE,
};
