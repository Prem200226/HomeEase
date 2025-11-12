import express from "express";
import cors from "cors";
import { connectDb } from "./src/configs/DbConfig.js";
import { verifyToken } from "./src/middlewares/VerifyToken.js";
import { registerUser, userLogin } from "./src/controllers/UserController.js";
import { registerAdmin, adminLogin } from "./src/controllers/AdminController.js";
import { createBooking, getBookingsByUser } from "./src/controllers/BookingController.js";
import { getServices, getServicesByCategory, getServicesById } from "./src/controllers/servicesController.js";
import { addServices, deleteServicesById, updateService } from './src/controllers/adminServiceController.js';
import { getFeedbacks, getUserById, getUsers } from './src/controllers/adminController1.js';
import { handleGetPayment } from './src/controllers/handleGetPayment.js';
import { handleGetFeedback } from './src/controllers/handleGetFeedback.js';
import { handlePostFeedback } from './src/controllers/handlePostFeedback.js';
import { handlePostPayment } from './src/controllers/handlePostPayment.js';


const app = express();
app.use(cors());
app.use(express.json());


// app.get('/',(request,respone)=>{
//     response.send({message:"Welcome to User Application"})
// });

//  USER routes
app.post("/users/", registerUser);
app.post("/users/login", userLogin);

//  ADMIN routes
app.post("/admin/register", registerAdmin);
app.post("/admin/login", adminLogin);
app.post("/api/bookings", verifyToken,createBooking);
app.get("/api/bookings/user/:id", verifyToken,getBookingsByUser);

//services Route
app.get("/api/services",getServices);//
app.get("/api/services/:id",getServicesById);//
app.get("/api/services/category/:category", getServicesByCategory);//

//services CURD
app.post("/api/addservices",addServices);//
app.delete("/api/deleteservices/:id",deleteServicesById);//
app.put("/api/services/:id",updateService);//

//admin Routes
app.get("/api/admin/users",getUsers);
app.get("/api/admin/users/:id",getUserById);
app.get("/api/admin/feedbacks",getFeedbacks);


app.get("/payment/:id",handleGetPayment);
app.post("/payment", handlePostPayment);
app.post("/feedback", handlePostFeedback);
app.get("/feedback", handleGetFeedback);


app.get("/profile", verifyToken, (request,response)=>{
    response.send({message:"Access granted", userId: req.loggedInUserId});
});

app.listen(4500, ()=>{
    console.log('DB Connect');
    connectDb();
});