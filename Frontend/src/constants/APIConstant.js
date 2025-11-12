export const API_PORT = "4500";
export const API_BASE_URL = `http://localhost:${API_PORT}`;
export const USER_REGISTER_API_URL = `${API_BASE_URL}/users`;
export const USER_LOGIN_API_URL = `${API_BASE_URL}/users/login`;
export const ADMIN_API_URL = `${API_BASE_URL}/api/admin`;
export const SERVICE_API_URL = `${API_BASE_URL}/api/services`;
export const SERVICE_ENDPOINTS = {
    GET_ALL: `${API_BASE_URL}/api/services`,
    GET_BY_ID: (id) => `${API_BASE_URL}/api/services/${id}`,
    GET_BY_CATEGORY: (category) => `${API_BASE_URL}/api/services/category/${category}`,
    ADD: `${API_BASE_URL}/api/addservices`,
    DELETE: (id) => `${API_BASE_URL}/api/deleteservices/${id}`,
    UPDATE: (id) => `${API_BASE_URL}/api/services/${id}`
};
export const ADMIN_ENDPOINTS = {
    GET_USERS: `${API_BASE_URL}/api/admin/users`,
    GET_USER_BY_ID: (id) => `${API_BASE_URL}/api/admin/users/${id}`,
    GET_FEEDBACKS: `${API_BASE_URL}/api/admin/feedbacks`
};

export const BOOKING_ENDPOINTS = {
    ADD: `${API_BASE_URL}/api/bookings`,
    GET_BY_ID: (id) => `${API_BASE_URL}/api/bookings/${id}`
};

export const PAYMENT_ENDPOINTS = {
    GET: (id) => `${API_BASE_URL}/payment/${id}`,
    CREATE: `${API_BASE_URL}/payment`
};

export const FEEDBACK_ENDPOINTS = {
    CREATE: `${API_BASE_URL}/feedback`,
    GET_BY_SERVICE: (service_id) => `${API_BASE_URL}/feedback/${service_id}`
};