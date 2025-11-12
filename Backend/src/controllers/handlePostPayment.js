import { getConnectionObject } from "../configs/DbConfig.js";

export async function handlePostPayment(request, response){
    try {
        const connection = getConnectionObject();
        const data = request.body;
        console.log("request.body", request.body);
        // const pathParameter = request.params.id;
        // console.log("path Parameter = ", pathParameter);
        // const qry = INSERT INTO student VALUES(${data.roll},'${data.name}','${data.phone}',${data.marks});
        const qry = `
            INSERT INTO payments (service_id, amount, payment_method, payment_date)
            VALUES (?, ?, ?, ?)
        `;

        const [resultSet] = await connection.query(qry, [
            data.service_id,
            data.amount,
            data.payment_method,
            data.payment_date
        ]);
        // const [resultSet] = await connection.query(qry);
        if (resultSet.affectedRows === 1) {
            return response.status(200).send({ message: 'Payment done successfully' });
        } else {
            return response.status(500).send({ message: 'Payment failed' });
        }
    } catch (error) {
        console.log(error);
        if(error.errno === 1062){
            response.status(400).send({message:'Payment with already exists'});
        }
        else{
            response.status(500).send({message:'Something went wrong'});
        }
    }
}