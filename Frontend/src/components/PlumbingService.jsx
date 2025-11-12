import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { getServiceByCatagory } from '../services/Services';
import { Container, Row, Col, Spinner } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function DisplayPlumbing() {
    const navigate = useNavigate();
    const [services, setServices] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const category = 'Plumbing';

    useEffect(() => {
        fetchServiceDetails();
    }, []);

    const fetchServiceDetails = async () => {
        try {
            setIsLoading(true);
            const response = await getServiceByCatagory(category);
            const data = Array.isArray(response.data) ? response.data : (response.data.services || []);
            setServices(data);
        } catch (error) {
            console.error('Error fetching services:', error);
            toast.error('Failed to load plumbing services', { theme: 'colored' });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Container className="my-4">
            <h2 className="mb-4 text-center">Plumbing Services</h2>
            <p className="mb-5 text-center text-muted" style={{ maxWidth: 600, margin: '0 auto' }}>
                Professional plumbing services for all your needs. From repairs to installations, our expert plumbers ensure quality work and customer satisfaction.
            </p>
            {isLoading ? (
                <div className="text-center my-5">
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </div>
            ) : (
                <Row className="g-4 justify-content-center">
                    {services.slice(0, 3).map((service, idx) => (
                        <Col key={service.service_id || idx} md={4} sm={6} xs={12}>
                            <Card style={{ width: '100%', minHeight: 420, boxShadow: '0 2px 8px #eee' }}>
                                <Card.Img 
                                    variant="top" 
                                    src={service.image_url || '/placeholder.png'} 
                                    alt={service.service_name}
                                    style={{ height: 180, objectFit: 'cover', borderBottom: '1px solid #eee' }}
                                />
                                <Card.Body>
                                    <Card.Title>{service.service_name}</Card.Title>
                                    <Card.Text style={{ minHeight: 80 }}>
                                        {service.description?.slice(0, 100)}{service.description?.length > 100 ? '...' : ''}
                                    </Card.Text>
                                    <div className="d-flex justify-content-between align-items-center mt-3">
                                        <span className="fw-bold text-primary">₹{service.price}</span>
                                        <Button
                                            variant="primary"
                                            onClick={() => navigate(`/payment?service_id=${service.service_id || service.id}&amount=${service.price}`)}
                                        >
                                            Proceed to Payment
                                        </Button>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                    {services.length === 0 && (
                        <div className="text-center text-muted">No plumbing services found.</div>
                    )}
                </Row>
            )}
        </Container>
    );
}

export default DisplayPlumbing;
