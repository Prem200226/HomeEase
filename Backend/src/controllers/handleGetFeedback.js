import { getConnectionObject } from "../configs/DbConfig.js";


export async function handleGetFeedback(request, response) {
    const conn = getConnectionObject();
    try {
        const [rows] = await conn.query("SELECT * FROM feedback");
        response.status(200).send(rows);
    } catch (error) {
        response.status(500).send({ message: "Something went wrong" });
    }
}