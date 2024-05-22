const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const colors = require("colors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const bcrypt = require("bcrypt");

//REST object
const app = express();

//DOTENV
dotenv.config();

//MONGODB CONNECTION
connectDB();

//MIDDLEWARES
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

//ROUTES
// app.get("/", (req, res, next) => {
//   res.status(200).json({
//     success: true,
//     message: "welcome to the full stack app",
//   });
// });

app.use("/api/v1/auth", require("./routes/userRoutes"));
app.use("/api/v1/posts", require("./routes/postRoutes"));
app.get("/", (req,res)=>{
  res.status(200).send({
    "success":true,
    "msg":"Node Serevr Running"
  })
})
//PORT
const port = process.env.PORT || 8000;

//LISTEN
app.listen(port, () => {
  console.log(`server running on ${port}`.bgGreen.white);
});
