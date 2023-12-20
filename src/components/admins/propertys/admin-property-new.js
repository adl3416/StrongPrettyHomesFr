import React, { useState,useRef } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import "./admin-property.css";
import {
  Form,
  Button,
  Spinner,
  Row,
  Col,
  ButtonGroup,
  Image,
  Badge,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createProperty } from "../../../api/admin-property-service";

const AdminPropertyNew = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const initialValues = {
    title: "",
    description: "",
    category: "",
    type: "",
    bedrooms: "",
    bathrooms: "",
    garages: "",
    area: "",
    price: "",
    location: "",
    address: "",
    country: "",
    city: "",
    district: "",
    createDate: "",
    status: "",
    likeCount:0,
    visitCount:0,
    
  };

  const validationSchema = Yup.object({
    title: Yup.string().required("Please enter the title"),
    description: Yup.string().required("Please enter the description"),
    category: Yup.string().required("Please enter type of category"),
    type: Yup.string().required("Please enter type of type"),
    bedrooms: Yup.number().required("Please enter number of bedrooms"),
    bathrooms: Yup.number().required("Please enter number of bathrooms"),
    garages: Yup.number().required("Please enter number of garages"),
    area: Yup.number().required("Please enter number of area"),
    price: Yup.number().required("Please enter the price"),
    location: Yup.string().required("Please enter the location"),
    address: Yup.string().required("Please enter the address"),
    country: Yup.string().required("Please enter the country"),
    city: Yup.string().required("Please enter the city"),
    district: Yup.string().required("Please enter the district"),
    createDate: Yup.string().required("Please enter the createDate"),
    status: Yup.string().required("Please enter type of status"),
    
  });

  const onSubmit = async (values) => {
    
   setLoading(true);
    try {
      
      await createProperty(values);
      toast("Property created successfully");
      navigate(-1);

    } catch (err) {
      toast(err.response.data.message);
      console.log(err);
    }
    finally{
      setLoading(false);
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });


  return (
    <Form noValidate onSubmit={formik.handleSubmit}>
          
        <Col lg={12}>
          <Row>
            <Form.Group as={Col} md={4} lg={3} className="mb-3">
              <Form.Label>Category</Form.Label>
              <Form.Select
                {...formik.getFieldProps("category")}
                isInvalid={!!formik.errors.category}
              >
                <option>Select</option>
                <option value="HOUSE">House</option>
                <option value="VILLA">Villa</option>
                <option value="LAND">Land</option>
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                {formik.errors.category}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} md={4} lg={3} className="mb-3">
              <Form.Label>Type</Form.Label>
              <Form.Select
                {...formik.getFieldProps("type")}
                isInvalid={!!formik.errors.type}
              >
                <option>Select</option>
                <option value="RENT">Rent</option>
                <option value="SALE">Sale</option>
                
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                {formik.errors.type}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} md={4} lg={3} className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                {...formik.getFieldProps("title")}
                isInvalid={!!formik.errors.title}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.title}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} md={4} lg={3} className="mb-3">
              <Form.Label>Location</Form.Label>
              <Form.Control
                type="text"
                {...formik.getFieldProps("location")}
                isInvalid={!!formik.errors.location}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.location}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} md={4} lg={3} className="mb-3">
              <Form.Label>Country</Form.Label>
              <Form.Control
                type="text"
                {...formik.getFieldProps("country")}
                isInvalid={!!formik.errors.country}
              />

              <Form.Control.Feedback type="invalid">
                {formik.errors.country}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} md={4} lg={3} className="mb-3">
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                {...formik.getFieldProps("city")}
                isInvalid={!!formik.errors.city}
              />

              <Form.Control.Feedback type="invalid">
                {formik.errors.city}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} md={4} lg={3} className="mb-3">
              <Form.Label>District</Form.Label>
              <Form.Control
                type="text"
                {...formik.getFieldProps("district")}
                isInvalid={!!formik.errors.district}
              />

              <Form.Control.Feedback type="invalid">
                {formik.errors.district}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} md={4} lg={3} className="mb-3">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                {...formik.getFieldProps("address")}
                isInvalid={!!formik.errors.address}
              />

              <Form.Control.Feedback type="invalid">
                {formik.errors.address}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} md={4} lg={3} className="mb-3">
              <Form.Label>Bedrooms</Form.Label>
              <Form.Control
                type="number"
                {...formik.getFieldProps("bedrooms")}
                isInvalid={!!formik.errors.bedrooms}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.bedrooms}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} md={4} lg={3} className="mb-3">
              <Form.Label>Bathrooms</Form.Label>
              <Form.Control
                type="number"
                {...formik.getFieldProps("bathrooms")}
                isInvalid={!!formik.errors.bathrooms}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.bathrooms}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} md={4} lg={3} className="mb-3">
              <Form.Label>Garages</Form.Label>
              <Form.Control
                type="number"
                {...formik.getFieldProps("garages")}
                isInvalid={!!formik.errors.garages}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.garages}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} md={4} lg={3} className="mb-3">
              <Form.Label>Area</Form.Label>
              <Form.Control
                type="number"
                {...formik.getFieldProps("area")}
                isInvalid={!!formik.errors.area}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.area}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} md={4} lg={3} className="mb-3">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                {...formik.getFieldProps("price")}
                isInvalid={!!formik.errors.price}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.price}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} md={4} lg={3} className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                {...formik.getFieldProps("description")}
                isInvalid={!!formik.errors.description}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.description}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} md={4} lg={3} className="mb-3">
              <Form.Label>CreateDate</Form.Label>
              <Form.Control
                type="date"
                {...formik.getFieldProps("createDate")}
                isInvalid={!!formik.errors.createDate}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.createDate}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} md={4} lg={3} className="mb-3">
              <Form.Label>Status</Form.Label>
              <Form.Select
                {...formik.getFieldProps("status")}
                isInvalid={!!formik.errors.status}
              >
                <option>Select</option>
                <option value="ACTIVE">ACTIVE</option>
                <option value="SOLD">SOLD</option>
                <option value="RENTED">RENTED</option>
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                {formik.errors.status}
              </Form.Control.Feedback>
            </Form.Group>
  
         </Row>
        </Col>
      
      <div className="text-end">
        <ButtonGroup aria-label="Basic example">
          <Button variant="primary" type="submit" disabled={loading}>
            {loading && (
              <Spinner animation="border" variant="light" size="sm" />
            )}{" "}
            Create
          </Button>
          <Button variant="secondary" type="button" as={Link} to="/admin/properties">
            Cancel
          </Button>
        </ButtonGroup>
      </div>
    </Form>
  );
};

export default AdminPropertyNew
