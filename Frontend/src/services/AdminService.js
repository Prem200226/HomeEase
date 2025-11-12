// src/services/AdminService.js
import axios from "axios";

const BASE_URL = "http://localhost:4500";

export async function saveAdminData(adminData) {
  return axios.post(`${BASE_URL}/admin/register`, adminData);
}

export async function loginAdmin(credentials) {
  return axios.post(`${BASE_URL}/admin/login`, credentials);
}