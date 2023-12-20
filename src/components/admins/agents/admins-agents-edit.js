import React, { useEffect, useState, useRef } from 'react'

import * as Yup from "yup";
import { useFormik } from "formik";
import {
  Form,
  Button,
  Spinner,
  Row,
  Col,
  ButtonGroup,
  Badge,
  Image,
  Alert,
} from "react-bootstrap";

import MaskedInput from "react-maskedinput";
import { useNavigate, useParams, Link } from "react-router-dom";

import { toast } from "react-toastify";
import alertify from "alertifyjs";
import { deleteAgent, getAgent, updateAgent, uploadAgentImage } from '../../../api/admin-agent-service';

export const AdminsAgentsEdit = () => {
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const { agentId } = useParams();
  const [imageSrc, setImageSrc] = useState("");
  const fileImageRef = useRef();
  const navigate = useNavigate();
  const [isImageChanged, setIsImageChanged] = useState(false)

  const [initialValues, setInitialValues] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    
    
  });
  const validationSchema = Yup.object({
    firstName: Yup.string().required("Please enter the firstName"),
    lastName: Yup.string().required("Please enter number of lastName"),
    phoneNumber: Yup.string().required("Please enter number of phoneNumber"),
    email: Yup.string().email().required("Please enter luggage email"),
    
  });
  const onSubmit = async (values) => {
    try {
      setLoading(true);
      let imageId = values.image[0];
      if (isImageChanged) {
        const formData = new FormData();
        formData.append("file", values.image);
        const respUpload = await uploadAgentImage(formData);
         imageId = respUpload.data.imageId;
     setIsImageChanged(false); }  
      const agentDto = { ...values };
      delete agentDto["image"];
      await updateAgent(agentId, imageId, agentDto);
      toast("Agent created successfully");
      
      navigate(-1);
    } catch (err) {
      toast(err.response.data.message);
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  const formik = useFormik({
    enableReinitialize: true,
    initialValues,
    validationSchema,
    onSubmit,
  });
  const handleSelectImage = () => {
    fileImageRef.current.click();
  };
  const handleImageChange = () => {
    const file = fileImageRef.current.files[0];
    if (!file) return;
    // formik state inin manuel olarak set ettik. Seçilen dosyayı image alanına yerleştirdik
    formik.setFieldValue("image", file);
    // Seçilen görüntüyü ekrana yerleştirdik
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImageSrc(reader.result);
    };
    setIsImageChanged(true);
  };
  const loadData = async () => {
    try {
      const resp = await getAgent(agentId);
      setInitialValues(resp.data);
      
      const image = `${process.env.REACT_APP_API_URL}/agentImg/display/${resp.data.image}`;
      
      setImageSrc(image);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    loadData();
  }, []);
  const removeAgent = async () => {
    try {
      setDeleting(true);
      await deleteAgent(agentId);
      toast("Agent deleted");
      navigate(-1);
    } catch (err) {
      toast(err.response.data.message);
      console.log(err);
    }
    finally{
      setDeleting(false);
    }
  }
 
  const handleDelete = () => {
    alertify.confirm(
      "Delete",
      "Are you sure want to delete?",
      () => {
        removeAgent();
      },
      () => {}
    );
  };

 






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
          <img src={imageSrc} className="img-fluid" />
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
                isInvalid={!!formik.errors.firstName}
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
                isInvalid={!!formik.errors.lastName}
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
              <Form.Label>email</Form.Label>
              <Form.Control
                type="email"
                {...formik.getFieldProps("email")}
                isInvalid={!!formik.errors.email}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.luggage}
              </Form.Control.Feedback>
              </Form.Group>
            
          </Row>
        </Col>
      </Row>
      {initialValues.builtIn && (
        <Alert variant="danger">
          Built-in accounts can not be deleted and updated
        </Alert>
      )}
      <div className="text-end">
        <ButtonGroup aria-label="Basic example">
          {!initialValues.builtIn && (
            <>
              <Button variant="primary" type="submit" disabled={loading}>
                {loading && (
                  <Spinner animation="border" variant="light" size="sm" />
                )}{" "}
                Save
              </Button>
              <Button type="button" variant="danger" disabled={deleting} onClick={handleDelete}


>
                {deleting && (
                  <Spinner animation="border" variant="light" size="sm" />
                )}{" "}
                Delete
              </Button>
            </>
          )}
          <Button
            variant="secondary"
            type="button"
            as={Link}
            to="/admin/agents"
          >
            Cancel
          </Button>
        </ButtonGroup>
      </div>
    </Form>
  );
};
