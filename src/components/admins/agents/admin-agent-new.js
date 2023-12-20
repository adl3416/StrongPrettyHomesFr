import React, { useState, useRef  } from 'react'

import * as Yup from "yup";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import MaskedInput from "react-maskedinput";
import {
  Form,
  Button,
  Spinner,
  Row,
  Col,
  ButtonGroup,
  Image,
  Badge,
  Card,
  FormCheck,
} from "react-bootstrap";
import {Link, useNavigate, useParams } from "react-router-dom";
import { createAgent, uploadAgentImage } from '../../../api/admin-agent-service';


export const AdminAgentNew = () => {
  const [loading, setLoading] = useState(false);
  const [imageSrc, setImageSrc] = useState("");
  const fileImageRef = useRef();
  const {imageId}=useParams();
  const navigate = useNavigate();


  const initialValues = {
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    image: ""
  };

  const validationSchema = Yup.object({
    firstName: Yup.string().required("Please enter the firstName"),
    lastName: Yup.string().required("Please enter number of lastName"),
    phoneNumber: Yup.string().required("Please enter phoneNumber"),
    email: Yup.string().email().required("Please enter email"),
    image: Yup.mixed().required("Please select an image")
  });

  const onSubmit = async (values) => {
    try {
      setLoading(true);
      

      const formData = new FormData();

      formData.append("file", values.image);
      console.log(formData);
      const respUpload = await uploadAgentImage(formData);
      const imageId = respUpload.data.imageId;
      console.log(imageId)

      const agentDTO = {...values};
      delete agentDTO["image"];

      await createAgent(imageId, agentDTO);
      toast("Agent created successfully");
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

  const handleSelectImage = () => { 
    fileImageRef.current.click();
  }

  const handleImageChange = () => { 
    const file = fileImageRef.current.files[0];
    console.log(file);
    if(!file) return;

    // formik state inin manuel olarak set ettik. Seçilen dosyayı image alanına yerleştirdik
    formik.setFieldValue("image", file);

    // Seçilen görüntüyü ekrana yerleştirdik
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setImageSrc(reader.result);
    }


  }

  
  return (
    <Form noValidate onSubmit={formik.handleSubmit}>
      <Row>
        <Col lg={3} className="image-area">
          <Form.Control
            type="file"
            name="image"
            className="d-none"
            ref={fileImageRef}
            onChange={handleImageChange}
           
          />
          <img src={imageSrc} className="img-fluid"/>

          {formik.errors.image && (
            <Badge bg="danger" className="image-area-error">
              Please select an image
            </Badge>
          )}
          <Button
            variant={formik.errors.image ? "danger" : "primary"}
            onClick={handleSelectImage}
          >
            Select Image
          </Button>
        </Col>

        <Col lg={9}>
          <Row>
            <Form.Group as={Col} md={4} lg={3} className="mb-3">
              <Form.Label>firstName</Form.Label>
              <Form.Control
                type="text"
                {...formik.getFieldProps("firstName")}
                isInvalid={!!formik.errors.model}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.model}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} md={4} lg={3} className="mb-3">
              <Form.Label>lastName</Form.Label>
              <Form.Control
                type="text"
                {...formik.getFieldProps("lastName")}
                isInvalid={!!formik.errors.doors}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.doors}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} md={4} lg={3} className="mb-3">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter phone number"
            as={MaskedInput}
            mask="(111) 111-1111"
            {...formik.getFieldProps("phoneNumber")}
            isInvalid={!!formik.errors.phoneNumber}
          />
          <Form.Control.Feedback type="invalid">
            {formik.errors.phoneNumber}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group as={Col} md={4} lg={3} className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={formik.values.email}
                isInvalid={!!formik.errors.email}
                {...formik.getFieldProps("email")}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.email}
              </Form.Control.Feedback>
            </Form.Group>

            
          </Row>
        </Col>
      </Row>
      <div className="text-end">
        <ButtonGroup aria-label="Basic example">
          <Button variant="primary" type="submit" disabled={loading}>
            {loading && (
              <Spinner animation="border" variant="light" size="sm" />
            )}{" "}
            Create
          </Button>
          <Button variant="secondary" type="button" as={Link} to="/admin/vehicles">
            Cancel
          </Button>
        </ButtonGroup>
      </div>
    </Form>
  );
};

