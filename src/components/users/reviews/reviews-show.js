import {React, useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import {Container, Card, Spinner} from 'react-bootstrap'
import { deleteUserReviewById, getReviewsAll } from "../../../api/review-service";
import './reviews-show.css'
import { useStore } from "../../../store";

import {RiDeleteBin6Line} from 'react-icons/ri'
import {VscEdit} from 'react-icons/vsc'
import { getUser } from "../../../api/user-service";
import {useNavigate} from "react-router-dom";
import alertify from "alertifyjs";
import { toast } from "react-toastify";

const ReviewsShow = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const { propertyId } = useParams();
  const { userState, dispatchUser } = useStore();
  const { isUserLogin, user } = userState;
  const [adSoyad,setAdSoyad] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    loadData();
  }, []);
  
  const handleEdit = (reviewId,name,surname) => {
  
    if(name==user.firstName && surname==user.lastName)
    navigate(`/user/review/${reviewId}`)
    else
    toast("You don't have permission to edit this review");
   }

   const removeReview = async (reviewId) => {
    try {
      
      await deleteUserReviewById(reviewId);
      toast("Review deleted successfully");
      navigate(-1);
    } catch (err) {
      console.log(err);
    } 
  };

  const handleDelete = (reviewId,name,surname) => {
    if(name==user.firstName && surname==user.lastName){
    alertify.confirm(
      "Delete",
      "Are you sure want to delete?",
      () => {
        removeReview(reviewId);
      },
      () => {}
    );
    }
    else
    toast("You don't have permission to delete this review");
  };
  
  const loadData = async () => {
    console.log(user)
    try {
      const resp = await getReviewsAll(propertyId);
      console.log(resp.data);
      setReviews(resp.data);

    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="reviews-container">
   
      {reviews.map((review, index) => (
       review.status=="PUBLISHED" &&
        (<Card>
          <Card.Body>
            <Card.Text>
             <span>{review.review}</span>{(review.firstName==user.firstName && review.lastName==user.lastName) && (<div><span className="ms-2"><VscEdit onClick={()=>handleEdit(review.id,review.firstName,review.lastName)}/></span><span className="ms-2"><RiDeleteBin6Line onClick={()=>handleDelete(review.id,review.firstName,review.lastName)}/></span></div>)}
            </Card.Text>
            <Card.Title><span>Score : {review.score} </span> <span>{review.firstName} {review.lastName}</span> <span> {review.localDate} </span></Card.Title>
          </Card.Body>
        </Card>)
    
      ))}
     
    </Container>
  );
};

export default ReviewsShow;
