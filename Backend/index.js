const express=require('express');
const path=require('path');
const dotenv=require('dotenv');
const connectDB=require("./config/db.js");
const userRoutes=require("./routes/userRoutes");
const eventRoutes=require("./routes/eventRoutes")

dotenv.config({ path: path.resolve(__dirname, '../.env') });;

connectDB();
const app=express();
app.use(express.json());
app.use('/api/users',userRoutes);   //userRoutes is imported above 
// Adding middleware error files
// notFound error when user sends post or get request to wrong URL's

// ADDING ROUTES FOR EVENTS
app.use('/api/events',eventRoutes);   //eventRoutes is imported above 
// app.get("/",(req,res)=>{
//     res.send("API is running");
// })
// ---------production ------------------
if (process.env.NODE_ENV === 'production') {
    const __dirname1 = path.resolve();
    
    app.use(express.static(path.join(__dirname1, "/frontend/build")));
  
    app.get("*", (req, res) =>{
      res.sendFile(path.resolve(__dirname1, "frontend", "build", "index.html"))

    });
  } else {
    app.get("/", (req, res) => {
      res.send("API is running..");
    });
  }

//   ------------------------
const { errorHandler, notFound } = require('./middlewares/errorMiddlewares');
app.use(notFound)
app.use(errorHandler)
const PORT=process.env.PORT || 5000;
app.listen(PORT,console.log(`Server started on port ${PORT} `));
