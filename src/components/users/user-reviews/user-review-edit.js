import React, { useState, useEffect } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import {
  Container,
  Form,
  Button,
  Spinner,
  Row,
  Col,
  ButtonGroup,
  InputGroup,
} from "react-bootstrap";

import { Link, useNavigate, useParams } from "react-router-dom";
import {
  updateReview,
  deleteUserReviewById,
  getUserReviewById,
} from "../../../api/review-service";
import moment from "moment";
import { useStore } from "../../../store";
import alertify from "alertifyjs";
import { toast } from "react-toastify";


const UserReviewEdit = ({reviewId}) => {

    const [initialValues, setInitialValues] = useState({
        review:"",
        score:"",
        localDate:"",
        status:""
        });
        const [saving, setSaving] = useState(false);
        const [deleting, setDeleting] = useState(false);
        const [scoreNumber,setScoreNumber] = useState();
        const navigate = useNavigate();
      
        const validationSchema = Yup.object({
          review: Yup.string().required("Enter the review"),
          score: Yup.string().required("Enter the score"),
          localDate: Yup.string().required("Enter the review date"),
          status: Yup.string().required("Enter the status"),
        });
        const onSubmit = async (values) => {
          console.log(values);
         
          setSaving(true);
          try {
           
            await updateReview(reviewId, values);
            toast("Review updated successfully");
            navigate(-1);
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
      
        const removeReview = async () => {
          try {
            setDeleting(true);
            await deleteUserReviewById(reviewId);
            toast("Review deleted successfully");
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
              removeReview();
            },
            () => {}
          );
        };

        const handleScore = (e) => {
          setScoreNumber(e.target.value)
        }
      
        const loadData = async () => {
          try {
            const resp = await getUserReviewById(reviewId);
            console.log(resp.data);
            setScoreNumber(resp.data.score)
            setInitialValues(resp.data);
          } catch (err) {
            console.log(err);
          } finally {
          }
        };
      
        useEffect(() => {
          loadData();
        }, []);
     
  return (
    <Container style={{width:"60%"}}>
    <Form noValidate onSubmit={formik.handleSubmit}>
      <Row>
        <Form.Group as={Col} md={6} className="mb-3" style={{marginRight:"4rem"}}>
          <Form.Label>Review</Form.Label>
          <Form.Control as="textarea" style={{width:"450px",height:"125px",borderRadius:"5px"}}
            type="text"
            name="review"
            placeholder="Type a review"
            {...formik.getFieldProps("review")}
            isInvalid={!!formik.errors.review}
          />
          <Form.Control.Feedback type="invalid">
            {formik.errors.review}
          </Form.Control.Feedback>
        </Form.Group>
        <Col>
        <Row>
        <Form.Group as={Col} md={6} className="mb-3" style={{width:"300px"}}>
         <Form.Label>Score : </Form.Label>
      {/*       <Form.Control
            type="text"
            placeholder="Type a score"
            {...formik.getFieldProps("score")}
            isInvalid={!!formik.errors.score}
          />  */}
            <label for="customRange3" class="form-label">{scoreNumber}</label>
        <input type="range" class="form-range" min="1" max="5" step="1" id="customRange3"
         {...formik.getFieldProps("score")}
         isInvalid={!!formik.errors.score}
         onClick={handleScore}></input>
          <Form.Control.Feedback type="invalid">
            {formik.errors.score}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md={6} className="mb-3" style={{width:"300px"}}>
          <Form.Label>Review Date</Form.Label>
          <Form.Control
            type="text"
            placeholder="Type a date"
            {...formik.getFieldProps("localDate")}
            isInvalid={!!formik.errors.localDate}
            disabled="true"
          />
          <Form.Control.Feedback type="invalid">
            {formik.errors.localDate}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md={6} className="mb-3" style={{width:"300px"}}>
          <Form.Label>Status</Form.Label>
          <Form.Control
            type="text"
            placeholder="Type a status"
            {...formik.getFieldProps("status")}
            isInvalid={!!formik.errors.status}
            disabled="true"
          />
          <Form.Control.Feedback type="invalid">
            {formik.errors.status}
          </Form.Control.Feedback>
        </Form.Group>
        </Row>
        </Col>
        </Row>
        <div className="text-end ps-0" style={{marginTop:"6rem", position:"relative",left:"-18px"}}>
        <ButtonGroup aria-label="Basic example">
        <Button
            variant="primary"
            type="submit"
            disabled={saving}
          >
            {saving && <Spinner animation="border" variant="light" size="sm" />}{" "}
            Save
          </Button>

          <Button
            variant="secondary"
            type="button"
            onClick={() => navigate("/user/review")}
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
    </Container>

  )
}

export default UserReviewEdit