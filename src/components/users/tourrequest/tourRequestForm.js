import React, {useState} from 'react';
import { useFormik } from "formik";
import * as Yup from "yup";
import moment from "moment";
import { FloatingLabel,
  Container,
  Form,
  Row,
  Col,
  InputGroup,
  Button,
  Spinner,
} from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import SectionHeader from '../common/section-header/section-header';
import './tourRequest.css'
import { getUserTourRequestById, makeTourRequest } from '../../../api/tourrequest-service';





const TourRequestForm = () => {
 const [loading, setLoading] = useState(false);
 const [isPropertyAvailable, setIsPropertyAvailable] = useState(false);
 const navigate = useNavigate();
 const {propertyId} =useParams();

 const initialValues = { 
  tourRequestTime : "",
  adult : "",
  child : "",
   time:"",
 };

 const validationSchema = Yup.object({
  tourRequestTime: Yup.string().required("Enter a date and time please."),
  adult: Yup.string().required("Enter the number of adult please."),
  child: Yup.string().required("Select the number of child please."),
  time: Yup.string().required("Enter the time of Request.")
 });

 const onSubmit = async (values) => {
  const { tourRequestTime, adult, child, time } = values;
  const dto = {
    propertyId:propertyId,
    tourRequestTime: formatDateTime(tourRequestTime, time),
    adult : adult,
    child : child, 
  };

  setLoading(true);
  try {
    console.log(dto);
    await makeTourRequest(dto);
    toast("TourRequest created successfully");
    navigate("/");
  } catch (err) {
    toast(err.response.data.message);
    console.log(err.response.data.message);
  }finally{
    setLoading(false);
  }
 };


 const formik = useFormik({
  initialValues,
  validationSchema,
  onSubmit,
 });


 const formatDateTime = (date, time) => {
  return moment(`${date} ${time}`).format("MM/DD/YYYY HH:mm:ss");

};




  return (
    <div>
      <SectionHeader title="Tour Request Form"/>
      <Form noValidate onSubmit={formik.handleSubmit}>
        <Container className="form">
          <Row>
            <Col md={isPropertyAvailable ? 6 : 12}>
              <FloatingLabel label="adult" className="mb-3">
              <Form.Control
                  type="text"
                  placeholder="adult"
                  {...formik.getFieldProps("adult")}
                  isInvalid={formik.touched.adult && formik.errors.adult}
                />
                <Form.Control.Feedback type="invalid">
               {formik.errors.adult}
                </Form.Control.Feedback>
              </FloatingLabel>

              <FloatingLabel label="child" className="mb-3">
                <Form.Control
                  type="text"
                  placeholder="child"
                  {...formik.getFieldProps("child")}
                  isInvalid={formik.touched.child && formik.errors.child}
                />
                <Form.Control.Feedback type="invalid">
                  {formik.errors.child}
                </Form.Control.Feedback>
              </FloatingLabel>
              <InputGroup className="mb-3">
                <FloatingLabel label="tourRequestTime" className="flex-grow-1">
                  <Form.Control
                    type="date"
                    min={moment().format("MM/dd/yyyy")}
                    placeholder="tourRequestTime"
                    {...formik.getFieldProps("tourRequestTime")}
                    isInvalid={
                      formik.touched.tourRequestTime &&
                      formik.errors.tourRequestTime
                    }
               
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.tourRequestTime}
                  </Form.Control.Feedback>
                </FloatingLabel>
                <FloatingLabel label="Time">
                  <Form.Control
                    type="time"
                    placeholder="time"
                    {...formik.getFieldProps("time")}
                    isInvalid={
                      formik.touched.time &&
                      formik.errors.time
                    }
                
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.time}
                  </Form.Control.Feedback>
                </FloatingLabel>
              </InputGroup>
            </Col>
            <Col className="text-center">
             
     
            <Button
                variant="primary"
                size="lg"
                type="submit"
                disabled={loading}
              >
                {loading && <Spinner animation="border" size="sm" />} Make Tour Request
              </Button> 
            </Col>
          </Row>
        </Container>
      </Form>
    </div>
  )
}



export default TourRequestForm;
