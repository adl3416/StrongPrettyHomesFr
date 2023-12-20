import React,{useState,useEffect} from 'react'
import { useNavigate } from "react-router-dom";
import { getUserReviewsByUserId } from '../../../api/review-service';
import {Container,Table,Spinner} from 'react-bootstrap'

const UserReviews = () => {
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState([]);
  const navigate = useNavigate();

  const loadData = async () => {
    try {
      const resp = await getUserReviewsByUserId();
      console.log(resp.data);
      setReviews(resp.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleClick = (id) => {
    console.log("review" + id);
    navigate(`/user/review/${id}`);
  
  };

  useEffect(() => {
    loadData();
  }, []);



  return (
    <Container>
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Review</th>
          <th>Score</th>
          <th>Date Time</th>
          <th>Category</th>
          <th>Type</th>
          <th>Address</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {loading && (
          <tr>
            <td colSpan={8}>
              <Spinner animation="border" size="sm" /> Loading...
            </td>
          </tr>
        )}

        {reviews.map((review, index) => (
          <tr key={index} onClick={ ()=>handleClick(review.id)} style={{cursor: 'pointer'}}>
            <td>{index + 1}</td>
            <td>{review.review}</td>
            <td>{review.score}</td>
            <td>{review.localDate}</td>
            <td>{review.category}</td>
            <td>{review.type}</td>
            <td>{review.city} - {review.address}</td>
            <td>{review.status}</td>
          </tr>
        ))}

        { !loading && reviews.length <= 0 && (
          <tr className="table-warning">
            <td colSpan={8}>No reviews</td>
          </tr>
        )}
      </tbody>
    </Table>
  </Container>
  )
}

export default UserReviews