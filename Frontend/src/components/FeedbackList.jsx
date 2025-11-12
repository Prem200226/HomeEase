import { useEffect, useState } from "react";
import { Container, Table, Spinner, Alert } from "react-bootstrap";
import axios from "axios";

export function FeedbackList() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await axios.get("http://localhost:4500/feedback");
        setFeedbacks(response.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch feedback. Please try again later.");
        setLoading(false);
      }
    };

    fetchFeedbacks();
  }, []);

  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" variant="primary" />
        <p>Loading feedbacks...</p>
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="danger" className="mt-5 text-center">
        {error}
      </Alert>
    );
  }

  return (
    <Container className="mt-5 mb-5">
      <h2 className="text-center mb-4 text-primary">Customer Feedback 💬</h2>

      <Table striped bordered hover responsive className="shadow-sm">
        <thead className="table-dark text-center">
          <tr>
            <th style={{ width: "60px" }}>id</th>
            <th>Name</th>
            <th>Email</th>
            <th>Message</th>
          </tr>
        </thead>
        <tbody>
          {feedbacks.length > 0 ? (
            feedbacks.map((fb, index) => (
              <tr key={fb.id}>
                <td className="text-center">{index + 1}</td>
                <td>{fb.name}</td>
                <td>{fb.email}</td>
                <td>{fb.message}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center text-muted">
                No feedback available yet.
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </Container>
  );
}







