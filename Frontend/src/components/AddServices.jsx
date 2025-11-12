import { useState } from "react";
import { Button, Col, Container, Form, Row, Spinner } from "react-bootstrap";
import { Bounce, toast } from "react-toastify";
import axios from "axios";
import { SERVICE_ENDPOINTS } from "../constants/APIConstant";

export function AddServices() {
    const [isLoading, setIsLoading] = useState(false);
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
            const response = await axios.post(SERVICE_ENDPOINTS.ADD, serviceData);
            
            if (response.status === 201 || response.status === 200) {
                toast.success("Service added successfully!", {
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

                // Reset form
                setFormData({
                    service_name: '',
                    description: '',
                    price: '',
                    category: '',
                    image_url: ''
                });
                setValidated(false);
            }
        } catch (error) {
            console.error('Error adding service:', error);
            let errorMessage = "Failed to add service. Please try again.";

            if (error.response?.data?.message) {
                errorMessage = error.response.data.message;
            } else if (error.response?.data?.error) {
                errorMessage = error.response.data.error;
            }

            toast.error(errorMessage, {
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
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Container className="mt-4 mb-5 pb-5">
            <Row className="justify-content-center">
                <Col lg={8}>
                    <div className="mb-4">
                        <h2 className="mb-0">Add New Service</h2>
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
                                    Adding Service...
                                </>
                            ) : (
                                'Add Service'
                            )}
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}
