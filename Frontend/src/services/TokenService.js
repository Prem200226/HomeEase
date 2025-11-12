// src/services/TokenService.js

export function storeToken(token) {
  localStorage.setItem("token", token);
  window.dispatchEvent(new Event("authChange")); // 👈 important: triggers navbar update
}

export function getToken() {
  return localStorage.getItem("token");
}

export function clearToken() {
  localStorage.removeItem("token");
  window.dispatchEvent(new Event("authChange")); // 👈 triggers navbar update
}
