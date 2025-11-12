import { getConnectionObject } from "../configs/DbConfig.js";

// POST /api/bookings — Book a service
export async function createBooking(request, response) {
  try {
    const connection = getConnectionObject();
    const { service_id } = request.body;
    const user_id = request.loggedInUserId; // from verifyToken middleware

    if (!service_id) {
      return response.status(400).send({ message: "Service ID is required" });
    }

    const qry = `INSERT INTO bookings (user_id, service_id) VALUES (?, ?)`;
    const [result] = await connection.query(qry, [user_id, service_id]);

    if (result.affectedRows === 1) {
      response.status(201).send({ message: "Booking created successfully" });
    } else {
      response.status(500).send({ message: "Failed to create booking" });
    }
  } catch (error) {
    console.log(error);
    response.status(500).send({ message: "Something went wrong" });
  }
}

// GET /api/bookings/users/:id — Get bookings by user
export async function getBookingsByUser(request, response) {
  try {
    const connection = getConnectionObject();
    const { id } = request.params;

    const qry = `
      SELECT b.booking_id, s.service_name, s.price, b.booking_date, b.status, b.payment_status
      FROM bookings b
      JOIN services s ON b.service_id = s.service_id
      WHERE b.user_id = ?;
    `;
    const [rows] = await connection.query(qry, [id]);

    if (rows.length === 0) {
      response.status(404).send({ message: "No bookings found for this user" });
    } else {
      response.status(200).send(rows);
    }
  } catch (error) {
    console.log(error);
    response.status(500).send({ message: "Something went wrong" });
  }
}