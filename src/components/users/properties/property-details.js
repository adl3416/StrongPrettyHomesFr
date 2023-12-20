import React from 'react'
import {Container,Row,Col} from 'react-bootstrap'
import './property-details.css'
import {GiModernCity,GiHouseKeys, GiHouse,GiEarthAmerica} from 'react-icons/gi'
import {MdOutlineBedroomParent,MdOutlineBathroom} from 'react-icons/md'
import {TbDimensions} from 'react-icons/tb'
import PropertySlider from './property-slider'


const PropertyDetails = ({property}) => {

  const {id,type, price,bedrooms,bathrooms,category,district,city,country,description,location,area,image} = property;
  const imageSrc = `${process.env.REACT_APP_API_URL}/files/display/${image[0]}`;
  return (
    <>
    
       <Container className="property-details">
  <Col>
  <Row>
   <div>
   <PropertySlider/>
           <div className="price">
             ${price}
           </div>
           </div>
   
  </Row>
 
  <Row >
 
 <Container className="simge g-3 mt-5">
 <div >
          <div className="d-flex-container">
          <span>
           <GiEarthAmerica/>&nbsp; {country}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
           </span>
              
             <span className="city">
             <GiModernCity/> &nbsp;{city}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
             </span>
          
           <span>
           <GiHouseKeys/>&nbsp;{type} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
           </span>
         
       <span>
       <GiHouse/>&nbsp;{category}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
       </span>
       </div> 
       <div> 
       <br/>
           <span>
           &nbsp;&nbsp;<MdOutlineBedroomParent/>&nbsp;{bedrooms} bedrooms &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;
           </span>
           
              <span>
              <MdOutlineBathroom/>&nbsp;{bathrooms}bathrooms&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </span>
            
           <span>
           <TbDimensions/> &nbsp;{area} m<sup>2</sup>  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
           </span>
        
           </div>
           </div>
           </Container>
   </Row>
  </Col>
       </Container>
   
        
           </>
  )
}

export default PropertyDetails