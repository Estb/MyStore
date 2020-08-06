require("dotenv").config({
  path: process.env.NODE_ENV === "test" ? ".env.test" : ".env",
});


module.exports = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  dialect: process.env.DB_DIALECT || "mysql",
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  logging: false,
  define:{
    timestamps: true,
    underscored: false
  }
};
