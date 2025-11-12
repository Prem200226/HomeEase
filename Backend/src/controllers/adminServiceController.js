import { getConnectionObject } from "../configs/DbConfig.js";

export async function addServices(request, response) {
    try {
        const conn = getConnectionObject();
        const data = request.body;

        if (!data || typeof data !== 'object') {
            return response.status(400).send({ message: 'Invalid or missing request body' });
        }

        const { service_name, description, price, category, image_url } = data;
        if (!service_name || price == null) {
            return response.status(400).send({ message: 'Missing required fields: service_name and price' });
        }

        const qry = `INSERT INTO services (service_name, description, price, category, image_url) VALUES (?, ?, ?, ?, ?)`;
        const params = [service_name, description || null, price, category || null, image_url || null];

        const [resultSet] = await conn.execute(qry, params);
        if (resultSet.affectedRows === 1) {
            return response.status(201).send({ message: 'Service Registered' });
        } else {
            return response.status(500).send({ message: 'Service Registration failed' });
        }
    } catch (error) {
        if (error && error.code === 'ER_DUP_ENTRY') {
            return response.status(400).send({ message: 'Service already exists' });
        }
        console.error('addServices error:', error);
        return response.status(500).send({ message: 'Something went wrong' });
    }
}


export async function deleteServicesById(request, response) {
    try {
        const conn = getConnectionObject();
        const [deleteResult] = await conn.execute('DELETE FROM services WHERE service_id = '+request.params.id);
        if (deleteResult.affectedRows === 0) {
            return response.status(404).send({ message: 'Service with given id not found' });
        }

        return response.status(200).send({ message: 'Service deleted successfully' });
    } catch (error) {
        console.error('deleteServicesById error:', error);
        return response.status(500).send({ message: 'Something went wrong' });
    }
}

export async function updateService(request, response) {
    try {
        const conn = getConnectionObject();
        const data = request.body;
        const id = request.params.id;

        const query = "UPDATE services SET service_name = ?, description = ?, price = ?, category = ?, image_url = ? WHERE service_id = ?";
        const params = [data.service_name, data.description, data.price, data.category, data.image_url, id];

        const [result] = await conn.execute(query, params);
        
        if (result.affectedRows === 0) {
            response.status(404).send({ message: "Service not found" });
        } else {
            response.status(200).send({ message: "Service updated successfully" });
        }
    } catch (error) {
        console.error(error);
        response.status(500).send({ message: "Something went wrong" });
    }
}

