import React, { useState, useEffect } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import {
  Form,
  Button,
  Spinner,
  Row,
  Col,
  ButtonGroup,
  InputGroup,
} from "react-bootstrap";
import {  getTourId , updateTour , deleteTour} from '../../../api/admin-tourrequest-service';
import { Link, useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import { useStore } from "../../../store";
import alertify from "alertifyjs";
import { toast } from "react-toastify";

const AdminTourRequestEdit = () => {
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const { tourId } = useParams();
  const navigate = useNavigate();
  const { propertyState } = useStore();
  const { properties } = propertyState;
  
  const [initialValues, setInitialValues] = useState({
    adult: "",
    child: "",
    tourRequestTime: "",
    property: "",
    status: "",
    userId: "",
    agentId:"",
    propertyId:"",
    
  });
  const validationSchema = Yup.object({
    property: Yup.number().required("Select a property"),
    tourRequestTime: Yup.string().required("Enter the Tour time"),
    adult: Yup.string().required("Enter the number of adult"),
    child: Yup.string().required("Select number of child"),
    status: Yup.string().required("Select a status"),
  });
  const onSubmit = async (values) => {
    setSaving(true);
    
    try {
      const {
        adult,
        child,
        tourRequestTime,
        status,
      } = values;

      const propertyDto = {
        tourRequestTime: moment(tourRequestTime).format("MM/dd/yyyy HH:mm:ss"),
        adult: adult,
        child: child,
        status: status,
      };
      await updateTour(tourId, initialValues.propertyId, propertyDto);
      toast("Reservation updated successfully");
    } catch (err) {
      console.log(err);
      toast(err.response.data.message);
    } finally {
      setSaving(false);
    }
  };
  const formik = useFormik({
    enableReinitialize: true,
    initialValues,
    validationSchema,
    onSubmit,
  });
  const removeReservation = async () => {
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
  };
  const handleDelete = () => {
    alertify.confirm(
      "Delete",
      "Are you sure want to delete?",
      () => {
        removeReservation();
      },
      () => {}
    );
  };
  const loadData = async () => {
    try {
      const resp = await getTourId(tourId);
      console.log(resp.data);
      const {
        tourRequestTime,
        adult,
        child,
        property,
        status,
        userId,
        agentId,
        propertyId,
      } = resp.data;
      const reservationDto = {
        adult: adult,
        child: child,
        tourRequestTime: moment(tourRequestTime).format("MM/dd/yyyy HH:mm:ss"),
        property: property.id,
        status: status,
        userId: userId,
        agentId:property.agent.id,
        propertyId:property.id,
      };
      setInitialValues(reservationDto);
    } catch (err) {
      console.log(err);
    } finally {
    }
  };
  useEffect(() => {
    loadData();
  }, []);
   return (
    <Form noValidate onSubmit={formik.handleSubmit}>
      <Row>
        <Form.Group as={Col} md={4} lg={3} className="mb-3">
          <Form.Label>Adult</Form.Label>
          <Form.Control
            type="text"
            name="pickUpLocation"
            placeholder="Type a place"
            {...formik.getFieldProps("adult")}
            isInvalid={!!formik.errors.adult}
          />
          <Form.Control.Feedback type="invalid">
            {formik.errors.adult}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md={4} lg={3} className="mb-3">
          <Form.Label>Child</Form.Label>
          <Form.Control
            type="text"
            placeholder="Type a place"
            {...formik.getFieldProps("child")}
            isInvalid={!!formik.errors.child}
          />
          <Form.Control.Feedback type="invalid">
            {formik.errors.child}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md={4} lg={3} className="mb-3">
          <Form.Label>Tour Request Time</Form.Label>
          <InputGroup className="mb-3">
            <Form.Control
              type="string"
              {...formik.getFieldProps("tourRequestTime")}
              isInvalid={!!formik.errors.tourRequestTime}
            />
          </InputGroup>
          <Form.Control.Feedback type="invalid">
            {formik.errors.tourRequestTime}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md={4} lg={3} className="mb-3">
          <Form.Label>Status</Form.Label>
          <Form.Select
            {...formik.getFieldProps("status")}
            isInvalid={!!formik.errors.status}
          >
            <option>Select</option>
                <option value="PENDING">PENDING</option>
                <option value="APPROVED">APPROVED</option>
                <option value="REJECTED">REJECTED</option>
                <option value="DONE">DONE</option>
                <option value="CANCELED">CANCELED</option>
              </Form.Select>
          <Form.Control.Feedback type="invalid">
            {formik.errors.car}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md={4} lg={3} className="mb-3">
          <Form.Label>Customer</Form.Label>
          <div>
            <Link to={`/admin/users/${initialValues.userId}`}>
              Get customer
            </Link>
          </div>
        </Form.Group>
        <Form.Group as={Col} md={4} lg={3} className="mb-3">
          <Form.Label>Agent</Form.Label>
          <div>
            <Link to={`/admin/agents/${initialValues.agentId}`}>
              Get agent
            </Link>
          </div>
        </Form.Group>
        <Form.Group as={Col} md={4} lg={3} className="mb-3">
          <Form.Label>Property</Form.Label>
          <div>
            <Link to={`/admin/properties/${initialValues.property.id}`}>
              Get property
            </Link>
          </div>
        </Form.Group>
      </Row>
      <div className="text-end" gap={5}>
        <ButtonGroup aria-label="Basic example">
          <Button variant="primary" type="submit" disabled={saving}>
            {saving && <Spinner animation="border" variant="light" size="sm" />}{" "}
            Save
          </Button>
          <Button
            variant="secondary"
            type="button"
            onClick={() => navigate("/admin/tourrequest")}
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="danger"
            disabled={deleting}
            onClick={handleDelete}
          >
            {deleting && (
              <Spinner animation="border" variant="light" size="sm" />
            )}{" "}
            Delete
          </Button>
        </ButtonGroup>
      </div>
    </Form>
  );
};
export default AdminTourRequestEdit