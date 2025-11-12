import { getConnectionObject } from "../configs/DbConfig.js";

export async function getUsers(request, response) {

    const conn = getConnectionObject();
    try {
        const [rows, fields] = await conn.query("SELECT * FROM users");
        response.status(200).send(rows);
    } catch (error) {
        response.status(500).send({ message: "Something went wrong" });
    }

}

export async function getUserById(request, response) {

    const conn = getConnectionObject();
     try {
        const [rows]= await conn.query("SELECT * FROM users where user_id="+request.params.id);
        if(rows.length===0){
            response.status(404).send({message:"User Not found with given id"})
        }else{
            response.status(200).send(rows);
        }
    } catch (error) {
        response.status(500).send({meesaage:"Somthing went wrong"});
    }

}

export async function getFeedbacks(request,response){
    const conn=getConnectionObject();
    try {
        const [rows,fields]= await conn.query("SELECT * FROM feedbacks")
        response.status(200).send(rows);
    } catch (error) {
       response.status(500).send({meesaage:"Somthing went wrong"}) ;
    }
}
