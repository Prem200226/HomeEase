import axios from 'axios';
import { SERVICE_ENDPOINTS, PAYMENT_ENDPOINTS, BOOKING_ENDPOINTS, FEEDBACK_ENDPOINTS } from "../constants/APIConstant";

export async function saveService(serviceData) {
    return axios.post(SERVICE_ENDPOINTS.ADD, serviceData);
}

export function getAllServices() {
    return axios.get(SERVICE_ENDPOINTS.GET_ALL);
}

export function deleteService(id) {
    return axios.delete(SERVICE_ENDPOINTS.DELETE(id));
}

export function getServiceById(id) {
    return axios.get(SERVICE_ENDPOINTS.GET_BY_ID(id));
}

export function updateService(id, serviceData) {
    return axios.put(SERVICE_ENDPOINTS.UPDATE(id), serviceData);
}

export function getServiceByCatagory(category){
    return axios.get(SERVICE_ENDPOINTS.GET_BY_CATEGORY(category));
}

// export function getPayment(id) {
//     return axios.get(PAYMENT_ENDPOINTS.GET(id));
// }
// export function handlePostPayment(paymentData) {
//     return axios.post(PAYMENT_ENDPOINTS.CREATE, paymentData);
// }

export function createBooking(bookingData) {
    return axios.post(BOOKING_ENDPOINTS.ADD, bookingData);
}

// Payment helpers
export function getPayment(id) {
    return axios.get(PAYMENT_ENDPOINTS.GET(id));
}

export function postPayment(paymentData) {
    return axios.post(PAYMENT_ENDPOINTS.CREATE, paymentData);
}

// Feedback helpers
export function postFeedback(feedbackData) {
    return axios.post(FEEDBACK_ENDPOINTS.CREATE, feedbackData);
}

export function getFeedbackByService(serviceId) {
    return axios.get(FEEDBACK_ENDPOINTS.GET_BY_SERVICE(serviceId));
}