import React, { useEffect, useState } from 'react'
import {FaStar} from "react-icons/fa";
import { useStore } from '../../../store';
import { addReview } from '../../../api/review-service'
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import {Form, Spinner} from 'react-bootstrap'
import { useParams } from "react-router-dom";

 const colors ={
  orange: "#FFBA5A",
  grey: "#a9a9a9"
 }

const Review = () => {
  const stars=Array(5).fill(0);
  const [hoverValue, setHoverValue] = React.useState(undefined);
  const [loading, setLoading] = useState(false); 
  const {dispatchReview} = useStore();
  const [currentValue, setCurrentValue] = useState();
  
  const {propertyId} =useParams();
  const initialValues = {
   review:"",
   score:"",
 }
 
const validationSchema = Yup.object({
  review: Yup.string(),
  score: Yup.string(),
  property: Yup.string(),
  status: Yup.string(),
})

    
  const handleClick1 = (currentValue) => {
    setCurrentValue(currentValue);
    console.log(currentValue);
  }
  const onSubmit = async (values) => {
    const newValues ={...values,score:currentValue}
    setLoading(true)
    console.log(newValues);
    try {
      await addReview(newValues,propertyId)
      toast("Review was created successfully");
      setLoading(false)
    } catch (err) {
    console.log(err);  
    }
   }
  

const formik = useFormik({

  initialValues,
  validationSchema,
  onSubmit,
});

  const handleMouseOver = (value) => {
    setHoverValue(value);
  }

  const handleMouseLeave = (value) => {
   setHoverValue(undefined);
  }

  return (
    <>
   
   <div style={styles.container}>
      <h3>Rate and Give Feedback</h3>
      <div style={styles.stars}>
        {stars.map((_, index) =>{
               return(
                <FaStar
                  key={index}
                  size={24}
                  style={{
                   marginRight: 10,
                    cursor:"pointer"
                  }}
                  color={(hoverValue || currentValue) > index ? colors.orange : colors.grey }
                  onClick={() => handleClick1(index + 1)}
                  onMouseOver ={() => handleMouseOver(index + 1) }
                  onMouseLeave = {handleMouseLeave}     
                />
               )
        })}
      </div>
      <Form noValidate onSubmit={formik.handleSubmit} style={{display: 'flex',flexDirection: 'column',alignItems: 'center'}}>
       <textarea
        placeholder="What's your feedback" 
        style={styles.textarea}
        variant={formik.review}
        {...formik.getFieldProps("review")}
       />
       <button type="submit" style={styles.button} onSubmit={() => handleClick1} disabled={loading}>
       {loading && (
                  <Spinner animation="border" variant="light" size="sm" />
                )}Send Review</button>
    </Form>
   </div>
  
  </>)
}
const styles= {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  
    textarea: {
    border: "1px solid #a9a9a9",
    borderRadius: 5,
    width: 750,
    margin:"20px 20px",
    minHeight: 20,
    padding: 30

  },
  button: {
    border :0,
    backgroundColor : "var(--color1)",
    borderRadius: 5,
    width: 350,
    margin:"10px",
    minHeight:50,
    padding: 10,
    color:"white"
  }

}

export default Review