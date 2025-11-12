import { NavigationBar } from "./components/NavigationBar";
import { Login } from "./components/Login";
import { Footer } from "./components/Footer";
import { Register } from "./components/Register";
import { BrowserRouter, Route, Routes } from "react-router-dom";
//import { Dashboard } from "./components/Dashboard";
import { ToastContainer } from "react-toastify";
import { AddServices } from "./components/AddServices";
import { ServiceDashBord } from "./components/ServicesDashBord";
import { ServiceList } from "./components/ServiceList";
import { EditService } from "./components/EditService";
import 'react-toastify/dist/ReactToastify.css';
import DisplayElectronics from "./components/ElectricalService";
import DisplayPlumbing from "./components/PlumbingService";
import DisplayCarpentry from "./components/CarpentryService";
import DisplayGardaning from "./components/GardningServices";
import DisplayCleaning from "./components/CleaningService";
import DisplayPainting from "./components/PaintingService";
import { PrivateRoute } from "./components/PrivateRoute";  
import { ROLES } from "./constants/RoleConstants";  
import { Dashboard } from "./components/Dashboard";
import { FeedbackForm } from "./components/FeedbackForm";
import { Aboutus } from "./components/Aboutus";
import Payment from "./components/Payment";
import { FeedbackList } from "./components/FeedbackList";


function App() {

// const location = useLocation();

  return (
    <BrowserRouter>
    {/* <div style={{ 
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column"
      }}></div> */}
      {/* Main layout container */}
      <div className="d-flex flex-column min-vh-100">
        <NavigationBar />
        <ToastContainer />

        {/* Main content area that grows */}
        <div className="flex-grow-1">
          {/* <main style={{ flex: 1 }}> */}
          <Routes>
            <Route element={<PrivateRoute allowedRoles={[ROLES.ADMIN]}/>}>
              <Route path="/add-services" element={<AddServices />} />
              <Route path="/serviceList" element={<ServiceList />} />
              <Route path="/edit-service/:id" element={<EditService />} />
              <Route path="/feedback-list" element={<FeedbackList />} />
            </Route>
            <Route element={<PrivateRoute allowedRoles={[ROLES.ADMIN, ROLES.USER]}/>}>
            <Route path="/service-dashboard" element={<ServiceDashBord />} />
            <Route path="/electrical-services" element={<DisplayElectronics />} />
            <Route path="/plumbing-services" element={<DisplayPlumbing />} />
            <Route path="/carpentry-services" element={<DisplayCarpentry />} />
            <Route path="/gardening-services" element={<DisplayGardaning />} />
            <Route path="/cleaning-services" element={<DisplayCleaning/>}/>
            <Route path="/painting-services" element={<DisplayPainting/>}/>
            <Route path="/payment" element={<Payment />} />
            <Route path="/feedback" element={<FeedbackForm />} />
            
            <Route path="/about-us" element={<Aboutus />} />
            </Route>
            <Route path="/" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            
          </Routes>
          <ToastContainer/>
        </div>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
