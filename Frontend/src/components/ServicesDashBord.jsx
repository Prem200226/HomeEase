import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import cleaningImg from '../img/cleaning.png';
import plumberImg from '../img/plumber.png';
import electricalImg from '../img/electrical-service.png';
import paintingImg from '../img/house-painting.png';
import carpenterImg from '../img/carpenter.png';
import toolImg from '../img/tool.png';
import './ServiceDashboard.css';

export function ServiceDashBord() {
    const navigate = useNavigate();

    const cards = [
        { 
            title: 'Cleaning Service', 
            img: cleaningImg, 
            buttonText: 'View Services',
            path: '/cleaning-services',
            category: 'Cleaning'
        },
        { 
            title: 'Plumbing Service', 
            img: plumberImg, 
            buttonText: 'View Services',
            path: '/plumbing-services',
            category: 'Plumbing'
        },
        { 
            title: 'Electrical Service', 
            img: electricalImg, 
            buttonText: 'View Services',
            path: '/electrical-services',
            category: 'Electrical'
        },
        { 
            title: 'Painting Service', 
            img: paintingImg, 
            buttonText: 'View Services',
            path: '/painting-services',
            category: 'Painting'
        },
        { 
            title: 'Carpentry Service', 
            img: carpenterImg, 
            buttonText: 'View Services',
            path: '/carpentry-services',
            category: 'Carpentry'
        },
        { 
            title: 'Home Spa', 
            img: toolImg, 
            buttonText: 'View Services',
            path: '/gardening-services',
            category: 'Home Spa'
        }
    ];

    return (
        <Container className="mt-4">
            <Row className="justify-content-center mb-4">
                <Col lg={12}>
                    <h1 className="display-4 text-center fw-bold">Services</h1>
                </Col>
            </Row>
            <Row xs={1} sm={2} md={3} className="g-4">
                {cards.map((card, idx) => (
                    <Col key={idx}>
                        <Card className="h-100 shadow-sm border rounded service-card">
                            <div className="p-4 text-center" style={{ height: '200px' }}>
                                <Card.Img
                                    variant="top"
                                    src={card.img}
                                    alt={card.title}
                                    style={{ 
                                        height: '100%',
                                        width: 'auto',
                                        maxWidth: '100%',
                                        objectFit: 'contain',
                                        margin: 'auto'
                                    }}
                                />
                            </div>
                            <Card.Body className="d-flex flex-column">
                                <Card.Title className="text-center mb-3">{card.title}</Card.Title>
                                <div className="mt-auto">
                                    <Button 
                                        variant="primary" 
                                        className="w-100"
                                        onClick={() => navigate(card.path)}
                                    >
                                        {card.buttonText}
                                    </Button>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    )
}