import express from 'express';
import colors from 'colors';
import dotenv from 'dotenv'
import morgan from 'morgan';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoute.js';
import cors from 'cors';
import categoryRoutes from './routes/categoryRoutes.js'
import productRoutes from './routes/productRoutes.js'
import path from 'path';
// config env
dotenv.config();

const app = express();


connectDB();

app.use(cors())
app.use(express.json())
app.use(morgan(`dev`))

// route
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes)
app.use(express.static(path.join(__dirname,'./firstreact/build')))


// rest api
app.use('*',function(req,res){
    res.sendFile(path.join(__dirname,'./firstreact/build/index.html'))
});




// app.get("/", (req, res) => {
//     res.send("<h1>Welcome</h1>")
// });

const PORT = process.env.PORT || 8080;


app.listen(PORT, () => {
    console.log(`server running ${process.env.DEV_MODE} on ${PORT}`.bgCyan.white);
});

