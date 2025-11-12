import { hashSync, compareSync } from "bcrypt";
import jwt from "jsonwebtoken";
import { getConnectionObject } from "../configs/DbConfig.js";

export async function registerAdmin(request, response) {
  try {
    const connection = getConnectionObject();
    const { name, phone, password, email } = request.body;
    const encryptedPassword = hashSync(password, 12);

    const qry = `INSERT INTO admin(name, phone, password, email) VALUES (?, ?, ?, ?)`;
    const [resultSet] = await connection.query(qry, [name, phone, encryptedPassword, email]);

    if (resultSet.affectedRows === 1) {
      response.status(200).send({ message: "Admin registered successfully" });
    } else {
      response.status(500).send({ message: "Admin registration failed" });
    }
  } catch (error) {
    console.error(error);
    if (error.errno === 1062) {
      response.status(400).send({ message: "Admin with this email already exists" });
    } else {
      response.status(500).send({ message: "Something went wrong" });
    }
  }
}

export async function adminLogin(request, response) {
  try {
    const connection = getConnectionObject();
    const { email, password } = request.body;

    const qry = `SELECT * FROM admin WHERE email = ?`;
    const [rows] = await connection.query(qry, [email]);

    if (rows.length === 0)
      return response.status(400).send({ message: "Admin email not found" });

    if (!compareSync(password, rows[0].password))
      return response.status(400).send({ message: "Invalid password" });

    const token = jwt.sign({ adminId: rows[0].admin_id, role: "admin" }, "hello1234");
    response.status(200).send({ token, message: "Login successful" });
  } catch (err) {
    console.error(err);
    response.status(500).send({ message: "Something went wrong" });
  }
}
