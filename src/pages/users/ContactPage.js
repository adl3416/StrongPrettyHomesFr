import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import PageHeader from "../../components/users/common/page-header/page-header";
import { Spacer } from "../../components/users/common/spacer/spacer";
import Contact from "../../components/users/contact/contact";
import ContactForm from "../../components/users/contact/contact-form";
import Map from "../../components/users/contact/map";


const ContactPage = () => {
  return (
    <>
      <PageHeader title="Contact Us" />
      <Spacer/>
      <Container >
        <Row>
          <Col md={8}><ContactForm/></Col>
          <Col md={4}><Contact/></Col>
          <Map />
        </Row>
      </Container>
   
      <Spacer />
    </>
  );
};

export default ContactPage;
