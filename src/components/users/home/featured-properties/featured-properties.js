import React from 'react'
import { Container} from 'react-bootstrap';
import { useStore } from '../../../../store';
import PropertyCard from "../../common/property-card/property-card";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";


const FeaturedProperties = () => {

  const { propertyState } = useStore();
  const { properties } = propertyState;
  console.log(properties);
  return (
   


    
   <Container>
     <Swiper spaceBetween={10} slidesPerView={3} loop={true} >
        {properties.map((property, index) => (
          
          <SwiperSlide key={index}>
            <PropertyCard property={property} />
          </SwiperSlide>
        ))}
     </Swiper>
    </Container>
  
  )
}

export default FeaturedProperties