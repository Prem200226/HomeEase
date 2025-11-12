import axios from "axios";
import { USER_REGISTER_API_URL, USER_LOGIN_API_URL } from "../constants/APIConstant";

export async function saveData(formData){
    return axios.post(USER_REGISTER_API_URL,formData);
}
export function login(formData){
    return axios.post(USER_LOGIN_API_URL, formData);
}