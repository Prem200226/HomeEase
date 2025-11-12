import { getConnectionObject } from "../configs/DbConfig.js";

export async function handleGetPayment(request, response) {
    try {
        const connection = getConnectionObject();
        const bookingId = parseInt(request.params.id, 10);

        if (!bookingId) {
            return response.status(400).send({ message: 'Invalid booking id' });
        }

        const [rows] = await connection.execute(
            'SELECT * FROM payments WHERE booking_id = ?',
            [bookingId]
        );

        if (!rows || rows.length === 0) {
            return response.status(404).send({ message: 'No payment found for this booking' });
        }

        return response.status(200).send(rows[0]);
    } catch (error) {
        console.error('handleGetPayment error:', error);
        return response.status(500).send({ message: 'Something went wrong' });
    }
}