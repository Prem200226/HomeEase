import { getConnectionObject } from "../configs/DbConfig.js";

export async function getServices(request, response) {

    const conn = getConnectionObject();
    try {
        const [rows, fields] = await conn.query("SELECT * FROM services");
        response.status(200).send(rows);
    } catch (error) {
        response.status(500).send({ message: "Something went wrong" });
    }

}


export async function getServicesById(request, response) {

    const conn = getConnectionObject();
     try {
        const [rows]= await conn.query("SELECT * FROM services where service_id="+request.params.id);
        if(rows.length===0){
            response.status(404).send({message:"Service Not found with given id"})
        }else{
            response.status(200).send(rows);
        }
    } catch (error) {
        response.status(500).send({meesaage:"Somthing went wrong"});
    }

}


export async function getServicesByCategory(request, response) {
    try {
        const conn = getConnectionObject();
        const category = request.params.category;

        // Use LOWER() for case-insensitive comparison
        const [rows] = await conn.execute(
            "SELECT * FROM services WHERE LOWER(category) = LOWER(?)",
            [category]
        );

        if (rows.length === 0) {
            response.status(404).send({ message: `No services found in category '${category}'` });
        } else {
            response.status(200).send(rows);
        }
    } catch (error) {
        console.error("getServicesByCategory error:", error);
        response.status(500).send({ message: "Something went wrong" });
    }
}


