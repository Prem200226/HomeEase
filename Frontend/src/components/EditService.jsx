import { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row, Spinner } from "react-bootstrap";
import { Bounce, toast } from "react-toastify";
import { SERVICE_ENDPOINTS } from "../constants/APIConstant";
import { useParams } from "react-router-dom";
import { getServiceById, updateService } from "../services/Services";

export function EditService() {
    const { id } = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const [isFetching, setIsFetching] = useState(true);
    const [validated, setValidated] = useState(false);
    
    const [formData, setFormData] = useState({
        service_name: '',
        description: '',
        price: '',
        category: '',
        image_url: ''
    });

    const categories = [
        'Cleaning',
        'Plumbing',
        'Electrical',
        'Painting',
        'Carpentry',
        'Home Spa'
    ];

    useEffect(() => {
        fetchServiceDetails();
    }, [id]);

    const fetchServiceDetails = async () => {
        try {
            setIsFetching(true);
            const response = await getServiceById(id);
            const serviceData = response.data;
            setFormData({
                service_name: serviceData.service_name || '',
                description: serviceData.description || '',
                price: serviceData.price || '',
                category: serviceData.category || '',
                image_url: serviceData.image_url || ''
            });
        } catch (error) {
            console.error('Error fetching service:', error);
            toast.error("Failed to load service details", { theme: "colored" });
        } finally {
            setIsFetching(false);
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        
        // Form validation
        if (!form.checkValidity()) {
            event.stopPropagation();
            setValidated(true);
            return;
        }

        setIsLoading(true);
        try {
            // Prepare the data
            const serviceData = {
                service_name: formData.service_name.trim(),
                description: formData.description.trim(),
                price: parseFloat(formData.price),
                category: formData.category,
                image_url: formData.image_url.trim()
            };

            // Validate price
            if (isNaN(serviceData.price) || serviceData.price <= 0) {
                toast.error("Please enter a valid price", { theme: "colored" });
                setIsLoading(false);
                return;
            }

            // Make API call
            const response = await updateService(id, serviceData);
            
            if (response.status === 200 || response.status === 201) {
                toast.success("Service updated successfully!", {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                    transition: Bounce,
                });
            }
        } catch (error) {
            console.error('Error updating service:', error);
            const errorMessage = error.response?.data?.message || 
                               error.response?.data?.error || 
                               "Failed to update service. Please try again.";
            toast.error(errorMessage, {
                position: "top-right",
                autoClose: 5000,
                theme: "colored"
            });
        } finally {
            setIsLoading(false);
        }
    };

    if (isFetching) {
        return (
            <Container className="mt-4 text-center">
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </Container>
        );
    }

    return (
        <Container className="mt-4 mb-5 pb-5">
            <Row className="justify-content-center">
                <Col lg={8}>
                    <div className="mb-4">
                        <h2 className="mb-0">Edit Service</h2>
                    </div>
                </Col>
            </Row>
            <Row className="justify-content-center">
                <Col lg={8}>
                    <Form 
                        noValidate 
                        validated={validated} 
                        onSubmit={handleSubmit} 
                        className="p-4 bg-light rounded shadow-sm"
                    >
                        <Form.Group className="mb-3">
                            <Form.Label>Service Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter service name"
                                name="service_name"
                                value={formData.service_name}
                                onChange={handleChange}
                                required
                                minLength={3}
                                maxLength={50}
                            />
                            <Form.Control.Feedback type="invalid">
                                Please enter a service name (3-50 characters).
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Category</Form.Label>
                            <Form.Select
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select a category</option>
                                {categories.map((category, index) => (
                                    <option key={index} value={category}>{category}</option>
                                ))}
                            </Form.Select>
                            <Form.Control.Feedback type="invalid">
                                Please select a category.
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Price (₹)</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Enter price"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                required
                                min="1"
                                step="0.01"
                            />
                            <Form.Control.Feedback type="invalid">
                                Please enter a valid price (greater than 0).
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={4}
                                placeholder="Enter service description"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                required
                                minLength={20}
                                maxLength={500}
                            />
                            <Form.Control.Feedback type="invalid">
                                Please enter a description (20-500 characters).
                            </Form.Control.Feedback>
                            <Form.Text className="text-muted">
                                Provide detailed information about the service including what's included.
                            </Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-4">
                            <Form.Label>Image URL</Form.Label>
                            <Form.Control
                                type="url"
                                placeholder="Enter image URL"
                                name="image_url"
                                value={formData.image_url}
                                onChange={handleChange}
                                required
                                pattern="https?://.+"
                            />
                            <Form.Control.Feedback type="invalid">
                                Please enter a valid image URL (must start with http:// or https://).
                            </Form.Control.Feedback>
                            <Form.Text className="text-muted">
                                Enter the URL of the service image (must be a valid HTTP/HTTPS URL)
                            </Form.Text>
                        </Form.Group>

                        <Button 
                            variant="primary" 
                            type="submit" 
                            className="w-100" 
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <>
                                    <Spinner
                                        as="span"
                                        animation="border"
                                        size="sm"
                                        role="status"
                                        aria-hidden="true"
                                        className="me-2"
                                    />
                                    Updating Service...
                                </>
                            ) : (
                                'Update Service'
                            )}
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}