import { useEffect, useState } from "react";
import { Alert, Button, Col, Container, Modal, Row, Table } from "react-bootstrap";
import { getAllServices, deleteService } from "../services/Services";
import '../assets/css/productlist.css';
import { Bounce, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export function ServiceList() {

    const [services, setServices] = useState([]);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [selectedService, setSelectedService] = useState(null);

    const navigate = useNavigate();

    const fetchServices = async () => {
        try {
            const response = await getAllServices();
            // Backend might return array directly or an object { services: [...] }
            const payload = response.data;
            const list = Array.isArray(payload) ? payload : (payload?.services || payload?.data || []);
            console.log('Fetched services:', list);
            setServices(list);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchServices();
    }, []);

    const hideConfirmation = () => {
        setShowConfirmation(false);
    }

    const showSuccessToast = (message) => {
        toast.success(message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Bounce,
        });
    }

    const showErrorToast = (message) => {
        toast.error(message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Bounce,
        });
    }

    const handleServiceDelete = async () => {
        try {
            if (selectedService) {
                // prefer service_id field as provided by backend
                const idToDelete = selectedService.service_id || selectedService.id || selectedService._id;
                if (!idToDelete) throw new Error('No id found for selected service');

                const response = await deleteService(idToDelete);

                // treat any 2xx as success
                if (response.status >= 200 && response.status < 300) {
                    showSuccessToast("Service deleted");
                    const remaining = services.filter((s) => {
                        const sid = s.service_id || s.id || s._id;
                        return sid !== idToDelete;
                    });
                    setServices(remaining);
                } else {
                    console.error('Delete returned non-success status', response.status, response.data);
                    showErrorToast('Service deletion failed');
                }
            }
        } catch (error) {
            console.error('Error while deleting service:', error);
            // If backend returned response with details, show it
            const backendMsg = error?.response?.data?.message || error?.response?.data?.error;
            if (backendMsg) showErrorToast(backendMsg);
            else showErrorToast("Service deletion failed");
        }
        finally {
            setShowConfirmation(false);
        }
    }

    return (
        <Container className="mt-3">
            <Row>
                <Col lg={8}>
                    <Alert variant="primary">Service List</Alert>
                </Col>
            </Row>
            {
                services.length === 0 ? <Alert variant="warning">No Services found</Alert> : <Table className="mt-3">
                    <thead>
                        <tr>
                            <th>S.No</th>
                            <th>Service Name</th>
                            <th>Price (₹)</th>
                            <th>Category</th>
                            <th>Description</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            services.map((service, index) => {
                                // prefer service_id from backend, fallback to id/_id or index
                                const sid = service.service_id || service.id || service._id || index;
                                return (
                                    <tr key={sid}>
                                        <td>{index + 1}</td>
                                        <td>{service.service_name}</td>
                                        <td>{service.price}</td>
                                        <td>{service.category}</td>
                                        <td>{service.description}</td>
                                        <td>
                                            <Button variant="danger" size="sm" className="action-button me-2" onClick={() => {
                                                setShowConfirmation(true);
                                                setSelectedService(service);
                                            }}>Delete</Button>
                                            <Button
                                                variant="primary"
                                                size="sm"
                                                className="action-button"
                                                onClick={() => {
                                                    navigate(`/edit-service/${sid}`);
                                                }}>Edit</Button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </Table>

            }
            <Modal show={showConfirmation} onHide={hideConfirmation}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmation</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure, you want to delete the {selectedService ? selectedService.service_name : ''} ?</Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={hideConfirmation}>
                        No
                    </Button>
                    <Button variant="success" onClick={handleServiceDelete}>
                        Yes
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    )
}