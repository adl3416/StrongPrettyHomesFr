import React from 'react'
import { Container, Nav, Navbar } from "react-bootstrap";
import logo from "../../../../assets/img/logo/logo.png";
import {RiHome3Line, RiInformationLine, RiMapPinLine} from "react-icons/ri";
import {useState} from 'react';

import "./main-navbar.css";
import { UserMenu } from './user-menu';
import { ImHome2 } from "react-icons/im";
import { Link,useLocation } from 'react-router-dom';



export const Mainnavbar = () => {
  const location = useLocation();
  const currentPath = location.pathname;


  window.addEventListener("scroll", () => {
    window.scrollY > 20
      ? document.querySelector(".main-navbar").classList.add("scrolled")
      : document.querySelector(".main-navbar").classList.remove("scrolled");
  });

  return (

    <Navbar expand="xl" className="main-navbar" variant="dark">

      <Container>
        <Navbar.Brand  to="/">
          <img src={logo} alt="Properties" />

        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/" className={currentPath === "/" ? "active" : ""}>
              <RiHome3Line/> Home
            </Nav.Link>
            <Nav.Link as={Link} to="/properties" className={currentPath === "/properties" ? "active" : ""}>
             <ImHome2/> Properties
            </Nav.Link>
            <Nav.Link as={Link} to="/about" className={currentPath === "/about" ? "active" : ""}>
              <RiInformationLine/> About
            </Nav.Link>
            <Nav.Link as={Link} to="/contact" className={currentPath === "/contact" ? "active" : ""}>
              <RiMapPinLine/> Contact
            </Nav.Link>
            <UserMenu/>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}