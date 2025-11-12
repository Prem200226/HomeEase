import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { getToken } from "../services/TokenService";
import { getRole } from "../services/RoleService";
import { AccessDenied } from "./AccessDenied";

export function PrivateRoute({ allowedRoles }){
    // const { allowedRoles } = props;
    const token = getToken();
    const role = getRole();

    if(token){
        if(allowedRoles.includes(role)){
            return <Outlet/>
        }
        else{
            return <AccessDenied/>
        }
        
        // send user on the desired component
    }
    else{
        // redirect a user on login page
        return <Navigate to={"/"} />
    }
}