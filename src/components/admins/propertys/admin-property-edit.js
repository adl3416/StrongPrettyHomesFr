import React, { useState, useRef, useEffect } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import {
  Form,
  Button,
  Spinner,
  Row,
  Col,
  ButtonGroup,
  Image,
  Badge,
  Alert,
} from "react-bootstrap";
import { useNavigate, useParams, Link } from "react-router-dom";
import { toast } from "react-toastify";
import alertify from "alertifyjs";
import { deleteProperty, getPropertyId, updateProperty, uploadPropertyImage } from "../../../api/admin-property-service";
import moment from "moment";


const AdminPropertyEdit = () => {

  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const {propertiesId } = useParams();
  const [imageSrc, setImageSrc] = useState("");
  const fileImageRef = useRef();
  const navigate = useNavigate();

  const [isImageChanged, setIsImageChanged] = useState(false);

  const [initialValues, setInitialValues] = useState({
    id: "",
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
    visitCount:"",
    likeCount:"",
    image:"",
  });

  const validationSchema = Yup.object({
    title: Yup.string().required("Please enter the title"),
    description: Yup.string().required("Please enter the description"),
    category: Yup.string().required("Please enter the category"),
    type: Yup.string().required("Please enter the type"),
    bedrooms: Yup.string().required("Please enter number of bedrooms"),
    bathrooms: Yup.string().required("Please enter number of bathrooms"),
    garages: Yup.string().required("Please enter number of garages"),
    area: Yup.number().required("Please enter area of property"),
    price: Yup.number().required("Please enter price of property"),
    location: Yup.string().required("Please enter the location"),
    address: Yup.string().required("Please enter the address"),
    country: Yup.string().required("Please enter the country"),
    city: Yup.string().required("Please enter the city"),
    district: Yup.string().required("Please enter the district"),
    createDate: Yup.string().required("Please enter createDate"),
    status: Yup.string().required("Please enter the status"),
    image: Yup.mixed().required("Please select an image"),
  });

  const onSubmit = async (values) => {
    
    try {
      setLoading(true);

      let imageId = "";
      if (isImageChanged) {

        const formData = new FormData();
        formData.append("file", values.image);
        
        const respUpload = await uploadPropertyImage(propertiesId,formData);
        imageId = respUpload.data.imageId;
        setIsImageChanged(false);
      }
      
      const newValues = {...values};
      delete newValues["image"];
      const propertyDto = {...newValues,
        visitCount: initialValues.visitCount ,
         likeCount: initialValues.likeCount,
         createDate: initialValues.createDate,
                  
      };
        delete propertyDto["id"];
    console.log("pDto ",propertyDto)

      await updateProperty(propertiesId, propertyDto);
      toast("Property updated successfully");

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

  const removeProperty = async () => {
    try {
      setDeleting(true);
      await deleteProperty(propertiesId);
      toast("Property deleted");
      navigate(-1);
    } catch (err) {
      toast(err.response.data.message);
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
        removeProperty();
      },
      () => {}
    );
  };

  
  const loadData = async () => {
    try {
      const resp = await getPropertyId(propertiesId);
      const values={...resp.data}
      delete values["agent"];
      delete values["propertyDetails"];
      setInitialValues(values);
      const image = `${process.env.REACT_APP_API_URL}/files/display/${resp.data.image[0]}`;
      setImageSrc(image);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

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
              <Form.Label>Category</Form.Label>
              <Form.Select
                {...formik.getFieldProps("category")}
                isInvalid={!!formik.errors.category}
              >
                <option>Select</option>
                <option value="VILLA">Villa</option>
                <option value="HOUSE">House</option>
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
                {formik.errors.airConditioning}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} md={4} lg={3} className="mb-3">
              <Form.Label>Status</Form.Label>
              <Form.Select
                {...formik.getFieldProps("status")}
                isInvalid={!!formik.errors.status}
              >
                <option>Select</option>
                <option value="SOLD">Sold</option>
                <option value="RENTED">Rented</option>
                <option value="ACTIVE">Active</option>
              </Form.Select>

              <Form.Control.Feedback type="invalid">
                {formik.errors.status}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} md={4} lg={3} className="mb-3">
              <Form.Label>Bedrooms</Form.Label>
              <Form.Control
                type="text"
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
                type="text"
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
                type="text"
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
              <Form.Label>Created Date</Form.Label>
              <Form.Control
                type="text"
                {...formik.getFieldProps("createdDate")}
                isInvalid={!!formik.errors.createdDate}
             
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.createdDate}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md={3} lg={3} className="mb-3">
              <Form.Label>Visit Count</Form.Label>
              <Form.Control
                type="number"
                {...formik.getFieldProps("visitCount")}
                isInvalid={!!formik.errors.visitCount}
                disabled 
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.visitCount}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md={3} lg={3} className="mb-3">
              <Form.Label>Like Count</Form.Label>
              <Form.Control
                type="number"
                {...formik.getFieldProps("likeCount")}
                isInvalid={!!formik.errors.likeCount}
                disabled 
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.likeCount}
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
            </>
          )}

          <Button
            variant="secondary"
            type="button"
            as={Link}
            to="/admin/properties"
          >
            Cancel
          </Button>
        </ButtonGroup>
      </div>
    </Form>
  );
};


export default AdminPropertyEdit