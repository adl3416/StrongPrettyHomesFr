import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useStore } from "../../store";
import { useNavigate } from "react-router-dom";
import PageHeader from "../../components/users/common/page-header/page-header";
import {Spacer} from "../../components/users/common/spacer/spacer";
import PropertyDetails from "../../components/users/properties/property-details";
import { Col, Container, Row } from "react-bootstrap";
import PropertyAgent from "../../components/users/agent/property-agent.js";
import Review from "../../components/users/reviews/review";
import ReviewsShow from "../../components/users/reviews/reviews-show";
import TourRequestForm from "../../components/users/tourrequest/tourRequestForm";


export const PropertyDetailPage = () => {
  const { propertyId } = useParams();
  const { propertyState, userState } = useStore();
  const { properties } = propertyState;
  const [selectedProperty, setSelectedProperty] = useState({});
  const { isUserLogin } = userState;
  const navigate = useNavigate();

  useEffect(() => {
    const selectedProps = properties.filter((item) => item.id == propertyId);
    console.log(selectedProps);
    if (selectedProperty.length <= 0) navigate("/property-not-found");
    setSelectedProperty(selectedProps[0]);
    
  }, []);

  if (Object.keys(selectedProperty).length > 0)
    return (
      <>
     
      
      <PageHeader title={selectedProperty.title} />
        <Spacer />
        <Container > 
        <Row  className="align-items-center g-5">
          <Col md={10}>  
        <PropertyDetails property={selectedProperty}/>
        </Col> 
      
        <Col md={2}>
         <PropertyAgent agent={selectedProperty.agent} /> 
        </Col> 
      </Row>
      </Container> 
      <Spacer height={350}/> 
      <TourRequestForm tourRequest={selectedProperty}/>   
      <Spacer />  
      <Review/> 
      <Spacer />
      <ReviewsShow/>
      <Spacer />


      </>
    );
};