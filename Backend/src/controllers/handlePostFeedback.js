import { getConnectionObject } from "../configs/DbConfig.js";

export async function handlePostFeedback(request, response) {
  try {
    const connection = getConnectionObject();
    const data = request.body;

    const qry = `
      INSERT INTO feedback (name, email, message)
      VALUES (?, ?, ?)
    `;

    const [resultSet] = await connection.query(qry, [
      data.name,
      data.email,
      data.message
    ]);

    console.log(resultSet);

    if (resultSet.affectedRows === 1) {
      return response.status(200).send({ message: "Feedback added successfully" });
    } else {
      return response.status(500).send({ message: "Feedback not added" });
    }

  } catch (error) {
    console.log(error);
    return response.status(500).send({ message: "Something went wrong" });
  }
}
