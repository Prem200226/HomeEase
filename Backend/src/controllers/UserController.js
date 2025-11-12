import { compareSync, hashSync } from "bcrypt";
import { getConnectionObject } from "../configs/DbConfig.js";
import jwt from "jsonwebtoken";

export async function registerUser(request, response) {
  try {
    const connection = getConnectionObject();
    const { name, email, password, phone } = request.body;
    const encryptedPassword = hashSync(password, 12);
    const qry = `INSERT INTO users (name, email, password, phone) VALUES (?, ?, ?, ?)`;
    const [resultSet] = await connection.query(qry, [name, email, encryptedPassword, phone]);

    if (resultSet.affectedRows === 1) {
      response.status(200).send({ message: "User registered successfully" });
    } else {
      response.status(500).send({ message: "User registration failed" });
    }
  } catch (error) {
    console.log(error);
    if (error.errno === 1062) {
      response.status(400).send({ message: "User with this email already exists" });
    } else {
      response.status(500).send({ message: "Something went wrong" });
    }
  }
}

export async function userLogin(request, response) {
  try {
    const connection = getConnectionObject();
    const { email, password } = request.body;

    // ✅ Always using 'users' table
    const qry = `SELECT * FROM users WHERE email = ?`;
    const [rows] = await connection.query(qry, [email]);

    if (rows.length === 0) {
      return response.status(400).send({ message: "Email not found" });
    }

    const user = rows[0];

    if (!compareSync(password, user.password)) {
      return response.status(400).send({ message: "Invalid password" });
    }

    // ✅ Generate JWT token with role 'user'
    const token = jwt.sign(
      { userId: user.user_id, role: "user" },
      "hello1234",
      { expiresIn: "1h" }
    );

    response.status(200).send({
      token,
      message: "Login successful",
      user: {
        id: user.user_id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: "user"
      }
    });
  } catch (error) {
    console.error(error);
    response.status(500).send({ message: "Something went wrong" });
  }
}
