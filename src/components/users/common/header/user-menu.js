import React from 'react'
import alertify from "alertifyjs";
import { Nav, NavDropdown } from "react-bootstrap";
import { RiUserLine } from "react-icons/ri";
import { Link,useNavigate} from 'react-router-dom';
import { useStore } from '../../../../store';
import { logout } from '../../../../store/user/userActions';

export const UserMenu = () => {
  const { userState, dispatchUser } = useStore();
  const { isUserLogin, user } = userState;
  const navigate = useNavigate();
  const handleLogout = () => {
    alertify
      .confirm(
        "Logout",
        "Are you sure want to logout?",
        () => {
          dispatchUser(logout());
          localStorage.removeItem("token");
          navigate("/");
        },
        () => {}
      )
      .set("labels", { ok: "Yes", cancel: "No" });
  };


  return (
    <>

{isUserLogin ? (
        <NavDropdown title={`${user.firstName} ${user.lastName}`} align="end">
          {user.role.includes("Administrator") && (
            <>
              <NavDropdown.Item as={Link} to="/admin">
                Admin Panel
              </NavDropdown.Item>
              <NavDropdown.Divider />
            </>
          )} 
           {user.role.includes("User") && (
            <>
          <NavDropdown.Item as={Link} to="/user/tourrequest">
            Tour Requests
          </NavDropdown.Item>
          </>
          )}
          <NavDropdown.Item as={Link} to="/user/review">
            Reviews
          </NavDropdown.Item>

          <NavDropdown.Item as={Link} to="/user">
            Profile
          </NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
        </NavDropdown>
      ) : (
        <Nav.Link as={Link} to="/auth">
          <RiUserLine /> Login/Register
        </Nav.Link>
      )}
    
   
  </>
  )
}
