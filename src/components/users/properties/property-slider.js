
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Carousel } from 'react-bootstrap';
import { useStore } from "../../../store"

const PropertySlider = () => {const { propertyId } = useParams();
const { propertyState, userState } = useStore();
const { properties } = propertyState;
const [selectedProperty, setSelectedProperty] = useState();

useEffect(() => {
  const selectedProperty = properties.filter((item) => item.id == propertyId);
  setSelectedProperty(selectedProperty[0]);
  console.log(selectedProperty);
}, []);

if (selectedProperty)

  return (
    <div>
          <Carousel className="asdfg">

          {selectedProperty.image.map((imgId, index) => {

let temp = `${process.env.REACT_APP_API_URL}/files/display/${imgId}`;
return <Carousel.Item  key={index} >

  <img src={temp}  alt="property" className="img-fluid"/>
  </Carousel.Item>
})} 

  </Carousel>
    </div>
  )
}

export default PropertySlider