import { useState, useEffect } from 'react';
import { Form, Button, Container, Card } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { postPayment, getServiceById } from '../services/Services';

const Payment = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isLoading, setIsLoading] = useState(false);
    const [amountFromUrl, setAmountFromUrl] = useState(false);
    const [formData, setFormData] = useState({
        service_id: '',
        amount: '',
        payment_method: '',
        payment_date: new Date().toISOString().split('T')[0],
        user_id: localStorage.getItem('userId'), // Add user_id from localStorage
        payment_status: 'pending'
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    useEffect(() => {
        const fetchServiceDetails = async () => {
            const params = new URLSearchParams(location.search);
            const serviceId = params.get('service_id');
            let amountParam = params.get('amount');
            
            // Always set service_id if available
            if (serviceId) {
                setFormData(prev => ({
                    ...prev,
                    service_id: serviceId
                }));
            }

            // If amount is provided in URL and valid, use it
            if (amountParam) {
                const parsed = parseFloat(amountParam);
                if (!isNaN(parsed) && parsed > 0) {
                    setFormData(prev => ({
                        ...prev,
                        amount: parsed
                    }));
                    setAmountFromUrl(true);
                }

            // Only fetch service details if we need the price
            if (serviceId && !amountParam) {
                try {
                    const response = await getServiceById(serviceId);
                    if (response?.data?.price) {
                        const priceValue = parseFloat(response.data.price);
                        if (!isNaN(priceValue) && priceValue > 0) {
                            setFormData(prev => ({
                                ...prev,
                                amount: priceValue
                            }));
                            setAmountFromUrl(true);
                        }
                    }
                } catch (error) {
                    console.error('Failed to fetch service for payment:', error);
                    toast.error('Error loading service details');
                }
            }
        };

        fetchServiceDetails();
        };

        fetchServiceDetails();
    }, [location]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate amount exists and is a positive number
        const rawAmount = formData.amount;
        const parsedAmount = parseFloat(rawAmount);

        if (rawAmount === '' || isNaN(parsedAmount) || parsedAmount <= 0) {
            toast.error('Please provide a valid amount greater than 0');
            return;
        }

        // Prepare payload with numeric amount and required fields
        const payload = {
            service_id: formData.service_id,
            amount: parsedAmount,
            payment_method: formData.payment_method,
            payment_date: formData.payment_date,
            status: 'completed'  // or 'pending' based on your backend expectation
        };

        try {
            setIsLoading(true);
            console.log('Sending payment request:', payload);  // For debugging
            const response = await postPayment(payload);

            // consider 2xx as success
            if (response?.status >= 200 && response?.status < 300) {
                toast.success('Payment successful!');
                navigate('/service-dashboard');
            } else {
                toast.error('Payment failed. Please try again.');
            }
        } catch (error) {
            console.error('Payment error:', error);
            toast.error('Payment failed: ' + (error.response?.data?.message || error.message));
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Container className="my-4">
            <Card>
                <Card.Header as="h4" className="text-center">Payment Details</Card.Header>
                <Card.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Service ID</Form.Label>
                            <Form.Control
                                type="text"
                                name="service_id"
                                value={formData.service_id}
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Amount</Form.Label>
                            <Form.Control
                                type="number"
                                name="amount"
                                value={formData.amount}
                                onChange={handleInputChange}
                                readOnly={amountFromUrl}
                                style={{ backgroundColor: amountFromUrl ? '#f8f9fa' : undefined }}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Payment Method</Form.Label>
                            <Form.Select
                                name="payment_method"
                                value={formData.payment_method}
                                onChange={handleInputChange}
                                required
                            >
                                <option value="">Select payment method</option>
                                <option value="credit_card">Credit Card</option>
                                <option value="debit_card">Debit Card</option>
                                <option value="upi">UPI</option>
                                <option value="net_banking">Net Banking</option>
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Payment Date</Form.Label>
                            <Form.Control
                                type="date"
                                name="payment_date"
                                value={formData.payment_date}
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>

                        <div className="text-center">
                            <Button 
                                variant="primary" 
                                type="submit"
                                disabled={isLoading}
                            >
                                {isLoading ? 'Processing...' : 'Process Payment'}
                            </Button>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default Payment;
