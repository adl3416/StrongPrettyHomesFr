import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./side-bar.css";
import {
  RiHome3Line,
  RiUser3Line,
  RiFileList3Line,
  RiLogoutCircleRLine,
  RiDashboardLine,
} from "react-icons/ri";
import { MdHouseboat, MdSupportAgent } from "react-icons/md";
import { useStore } from "../../../store";
import alertify from "alertifyjs";
import { logout } from "../../../store/user/userActions";
import { Container, Nav, Navbar } from "react-bootstrap";
import logo from "../../../assets/img/logo/logo.png";


const SideBar = () => {
  const { userState, dispatchUser } = useStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    alertify.confirm(
      "Logout",
      "Are you sure want to logout?",
      () => {
        dispatchUser(logout());
        localStorage.removeItem("token");
        navigate("/");
      },
      () => {
        console.log("canceled");
      }
    );
  };

  return (
    <>
    <Navbar expand="lg" className="admin-navbar" variant="dark" >
      <Container>
        <Navbar.Brand as={Link} to="/admin">
        <img src={logo} className="img-fluid" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="aa">
            <Nav.Link as={Link} to="/admin">
              <RiDashboardLine /> Dashboard
            </Nav.Link>
            <Nav.Link as={Link} to="/admin/users">
              <RiUser3Line /> User Management
            </Nav.Link>
            <Nav.Link as={Link} to="/admin/properties">
            <MdHouseboat/> Property Management
            </Nav.Link>
            <Nav.Link as={Link} to="/admin/tourrequest">
              <RiFileList3Line /> Tour Request Management
            </Nav.Link>
            <Nav.Link as={Link} to="/admin/agents">
            <MdSupportAgent/> Agent Management
            </Nav.Link>
            <Nav.Link as={Link} to="/admin/reviews">
            <MdSupportAgent/> Reviews Management
            </Nav.Link>
            <Nav.Link as={Link} to="/">
              <RiHome3Line /> Web Site
            </Nav.Link>
            <Nav.Link onClick={handleLogout}>
              <RiLogoutCircleRLine /> Logout
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>



   </>

);
};

export default SideBar;