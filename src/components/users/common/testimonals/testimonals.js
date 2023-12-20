import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import testimonals from "./testimonals.json";
import "./testimonals.css";
import "swiper/css";
import "swiper/css/pagination";
import Testimonal from "./testimonal";


const Testimonals = () => {
    
  return (
    <section className="testimonals">
      <Container>
        <Row>
          <Col md={4}>
          </Col>
          <Col md={4}>
            <h3>Testimonals</h3>
            <p>Here could be a nice sub</p>
            <Swiper modules={[Pagination]} spaceBetwenn={50} slidesPerView={1} pagination={{clickable: true}}>
              {testimonals.map((testimonal,index)=>(<SwiperSlide key={index}><Testimonal {...testimonal}/></SwiperSlide>))}
            </Swiper>
          </Col>
          <Col md={4}>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Testimonals;

