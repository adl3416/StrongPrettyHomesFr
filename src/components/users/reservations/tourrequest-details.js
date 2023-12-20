import React, { useEffect, useState } from "react";
import {
  Accordion,
  Button,
  Col,
  Container,
  Spinner,
  Image,
  Row,
  Table,
} from "react-bootstrap";
import { getUserTourRequestById } from "../../../api/tourrequest-service";
import {  FiArrowLeft } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import moment from "moment";


const TourRequestDetails = ({ tourrequestId }) => {
  const [reservation, setReservation] = useState({});
  const [deleting, setDeleting] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const loadData = async () => {
    try {
      const resp = await getUserTourRequestById(tourrequestId );
      setReservation(resp.data);
      console.log(resp.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

/*   const removeReservation = async () => {
    try {
      setDeleting(true);
      await deleteTour(tourId);
      toast("Reservation deleted successfully");
      navigate(-1);
    } catch (err) {
      console.log(err);
    } finally {
      setDeleting(false);
    }
  }; */

  const handleDelete = () => {
   navigate("/contact")
  };

  useEffect(() => {
    loadData();
  }, []);
  
  if (Object.keys(reservation).length > 0)
    return (
      <Container>
        <Row>
        <Col md={6}>
            <h2 className="text-center">{reservation.property.category}</h2>
            <Image
              src={`${process.env.REACT_APP_API_URL}/files/display/${reservation.property.image[0]}`}
              className="img-fluid"
            />
            <Button
              variant="primary"
              className="mt-3"
              onClick={() => navigate(-1)}
            >
              <FiArrowLeft /> Back to reservations
            </Button>
          </Col>
          <Col md={6}>
            <Accordion defaultActiveKey="0">
              <Accordion.Item eventKey="0">
                <Accordion.Header>Tour Details</Accordion.Header>
                <Accordion.Body>
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th colSpan={2}>
                          <h3>${reservation.property.price}</h3>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th>Property</th>
                        <td>{reservation.property.category}</td>
                      </tr>
                      <tr>
                        <th>Type</th>
                        <td>{reservation.property.type}</td>
                      </tr>
                      <tr>
                        <th>Location</th>
                        <td>{reservation.property.location}</td>
                      </tr>
                      <tr>
                        <th>TourRequest Time</th>
                        <td>{moment(reservation.tourRequestTime).format("llll")}</td>
                      </tr>
                      <tr>
                        <th>Status</th>
                        <td>{reservation.status}</td>
                      </tr>
                    </tbody>
                  </Table>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="1">
                <Accordion.Header>Property Details</Accordion.Header>
                <Accordion.Body>
                  <Table striped bordered hover>
                    <tbody>
                      <tr>
                        <td>Category</td>
                        <td>{reservation.property.category}</td>
                      </tr>
                      <tr>
                        <td>Type</td>
                        <td>{reservation.property.type}</td>
                      </tr>
                      <tr>
                        <td>Country</td>
                        <td>{reservation.property.country}</td>
                      </tr>
                      <tr>
                        <td>City</td>
                        <td>{reservation.property.city}</td>
                      </tr>
                      <tr>
                        <td>District</td>
                        <td>{reservation.property.district}</td>
                      </tr>
                       <tr>
                        <td>Address</td>
                        <td>{reservation.property.address}</td>
                      </tr>
                       <tr>
                        <td>Area</td>
                        <td>{reservation.property.area}</td>
                      </tr>
                      <tr>
                        <td>Bedrooms</td>
                        <td>{reservation.property.bedrooms}</td>
                      </tr>
                      <tr>
                        <td>Bathrooms</td>
                        <td>{reservation.property.bathrooms}</td>
                      </tr>
                      <tr>
                        <td>Garages</td>
                        <td>{reservation.property.garages}</td>
                      </tr>
                      <tr>
                        <td>Created Date</td>
                        <td>{moment(reservation.property.createdDate).format("llll")}</td>
                      </tr>
                      <tr>
                        <td>Description</td>
                        <td>{reservation.property.description}</td>
                      </tr>
                    </tbody>
            
                  </Table>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
         <br/>
         <div>
        <Button
            type="button"
            variant="danger"
            disabled={deleting}
            onClick={handleDelete}
          >
            {deleting && (
              <Spinner animation="border" variant="light" size="sm" />
            )}{" "}
            Reservasyonu Iptal Icin Tiklayiniz!
          </Button>
          </div>
          </Col>
     
        </Row>
       
      </Container>
    );
};
export default TourRequestDetails;