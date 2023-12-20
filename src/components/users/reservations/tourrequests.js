import moment from "moment";
import React, { useEffect, useState } from "react";
import { Container, Spinner, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { getUserTourRequests } from "../../../api/tourrequest-service";

const TourRequests = () => {
  const [loading, setLoading] = useState(true);
  const [reservations, setReservations] = useState([]);
  const navigate = useNavigate();

  const loadData = async () => {
    try {
      const resp = await getUserTourRequests();
      console.log(resp.data);
      setReservations(resp.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleClick = (id) => {
    console.log("tourId" + id);
    navigate(`/user/tourrequest/${id}`);
  
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <Container>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Property</th>
            <th>TourRequest Time</th>
            <th>Type</th>
            <th>Visitors</th>
            <th>Address</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {loading && (
            <tr>
              <td colSpan={7}>
                <Spinner animation="border" size="sm" /> Loading...
              </td>
            </tr>
          )}

          {reservations.map((tour, index) => (
            <tr key={index} onClick={ ()=>handleClick(tour.id)}>
              <td>{index + 1}</td>
              <td>{tour.property.category}</td>
              <td>{moment(tour.tourRequestTime).format("llll")}</td>
              <td>{tour.property.type}</td>
              <td>{tour.adult}+{tour.child}</td>
              <td>{tour.property.city} -{tour.property.address}</td>
              <td>{tour.status}</td>
            </tr>
          ))}

          { !loading && reservations.length <= 0 && (
            <tr className="table-warning">
              <td colSpan={7}>No Reservation</td>
            </tr>
          )}
        </tbody>
      </Table>
    </Container>
  );
};

export default TourRequests;
