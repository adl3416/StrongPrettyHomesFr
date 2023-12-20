import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import "./footer.css";
import { Link } from "react-router-dom";
import { RiHeadphoneLine, RiMailOpenLine, RiMapPinLine } from "react-icons/ri";
import { BsWhatsapp} from "react-icons/bs";
import {
  RiFacebookFill,
  RiTwitterFill,
  RiInstagramFill,
  RiWhatsappFill,
  RiLinkedinFill,
  RiHome3Line, RiInformationLine
} from "react-icons/ri";
import { MdHouseboat } from "react-icons/md";

const Footer = () => {
  return (
    <section className="footer">
      <Container>
        <Row className="sola-yasla">
          <Col md={3}>
            <h3>About Us</h3>
            <p>
             We`re reimagining how you buy, sell and rent.
            It`s now easier to get into a place you love. So let`s do this, together.
            </p>
          </Col>
          <Col md={3}>
            <h4>Quick Links</h4>
            <ul>
                <li><Link to="/"> <RiHome3Line/>&nbsp;Home</Link></li>
                <li><Link to="/about"><RiInformationLine/>&nbsp;About Us</Link></li>
                <li><Link to="/properties"><MdHouseboat/>&nbsp;Properties</Link></li>
                <li><Link to="/contact"><RiMapPinLine/>&nbsp;Contact Us</Link></li>
            </ul>
          </Col>
          <Col md={3}>
            <h4>Contact Us</h4>
          <ul>
      <li className="d-none d-lg-flex">
        <div>
          <Link to="mailto: info@strongprettyhomes.com"><RiMailOpenLine />&nbsp;info@strongprettyhomes.com</Link>
        </div>
      </li>
      <li className="d-none d-sm-flex">
        <div><RiMapPinLine />&nbsp;2301 Ravenswood Rd Madison, WI
        <br/> 53711
        </div>
      </li>
      <li>
        <div>
          <Link to="tel:3159052321"><RiHeadphoneLine />&nbsp;(315) 905-2321</Link>
        </div>
      </li>
      </ul>
      </Col>
          <Col md={3}>
          <h3>Follow Us</h3>
          <ul className="follow-us">
      <li>
        <Link to="#" target="_blank">
          <RiFacebookFill />
          </Link>
      </li>
      <li>
        <Link to="#" target="_blank">
          <RiTwitterFill />
          </Link>
      </li>
      <li>
        <Link to="#" target="_blank">
          <RiInstagramFill />
          </Link>
      </li>
      <li>
        <Link to="#" target="_blank">
          <RiWhatsappFill />
          </Link>
      </li>
      <li>
        <Link to="#" target="_blank">
          <RiLinkedinFill />
          </Link>
      </li>
  
    </ul>

        </Col>
        </Row>
      </Container>

    </section>
    
  );
};
export default Footer;
