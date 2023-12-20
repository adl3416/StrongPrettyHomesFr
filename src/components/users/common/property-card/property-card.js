import React, { useState } from "react";
import { Card } from "react-bootstrap";
import "./property-card.css";
import { RiHotelBedLine } from "react-icons/ri";
import { BiBath, BiHeartSquare } from "react-icons/bi";
import { FiPlusSquare } from "react-icons/fi";
import { BsFillHeartFill } from "react-icons/bs";
import { useNavigate, useParams } from "react-router-dom";
import { useStore } from "../../../../store";
import { postNewCount } from "../../../../api/property-service";

 //const imageSrc = require(`../../../../assets/img/properties/${image}`);
  //console.log(property);

const PropertyCard = ({ property }) => {
  const { propertyId } = useParams();
  const { propertyState } = useStore();
  const { properties } = propertyState;

  const {
    id,
    type,
    price,
    bedrooms,
    bathrooms,
    category,
    district,
    city,
    country,
    description,
    location,
    area,
    image,
    likeCount,
  } = property;

  const selected = properties.filter(item=>item.id==property.id)
  const imageSrc = `${process.env.REACT_APP_API_URL}/files/display/${selected[0].image[0]}`;
  const navigate = useNavigate();
  const [like, setLike] = useState(likeCount);
  const [isClicked, setIsClicked] = useState(false);


  const handleClick = (e) => {
    e.stopPropagation();

    if (isClicked) {
      setLike(like - 1);
    } else {
      setLike(like + 1);
    }
    setIsClicked(!isClicked);
    newCount(id, like);

  };

  const newCount = async({id, like}) => { 
   try {
        await postNewCount(id, like); 
       
       } catch (err) {
        console.log(err);
      } 
   }








     return (
    <Card className="property-card mb-4" onClick={()=> navigate(`/properties/${id}`)}>
      <div className="image-container">
        <Card.Img variant="top" src={imageSrc} className="img-fluid"/>
        <span className="price">
          <span>${price}</span>
          <span className="rent-sale">{type=="RENT" ? "For Rent" : "For Sale"}</span>
          <span className="like"><BsFillHeartFill onClick= {handleClick}/>&nbsp;{like}</span>
        </span>
      </div>

      <Card.Body>
        <Card.Title>{category}</Card.Title>
        <div>
            
            <h2>{description}</h2>
            <p>{district}, {city}, {location} {city} {country}</p>
        </div>
        <div>
          <ul className="row g-1">
            <li className="col-4">
             <RiHotelBedLine/>&nbsp;{bedrooms} beds
            </li>
            <li className="col-5">
            <BiBath/>&nbsp;{bathrooms} bathrooms
            </li>
            <li className="col-3">
            <FiPlusSquare/>&nbsp;{area} m<sup>2</sup>
            </li>
          
          </ul>
        </div>
      </Card.Body>
    </Card>
  )
};

export default PropertyCard;

