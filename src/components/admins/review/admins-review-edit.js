import React, { useEffect, useState } from "react";

import * as Yup from "yup";
import { useFormik } from "formik";
import {
  Form,
  Button,
  Spinner,
  Row,
  Col,
  ButtonGroup,
  Alert,
} from "react-bootstrap";

import MaskedInput from "react-maskedinput";
import { useNavigate, useParams } from "react-router-dom";

import { toast } from "react-toastify";
import alertify from "alertifyjs";
import {
  deleteReview,
  getReview,
  updateReview,
} from "../../../api/admin-review-service";

export const AdminsReviewEdit = () => {
  const [initialValues, setInitialValues] = useState({
    review: "",
    status: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const { reviewId } = useParams();
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    review: Yup.string().required("Please enter your first name"),
    status: Yup.string().required("Please enter your phone number"),
  });

  const onSubmit = async (values) => {
    setSaving(true);

    const data={...values}

    

    try {
      await updateReview(reviewId, data.status);
      toast("Review was updated successfully");
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

  const loadData = async () => {
    try {
      const resp = await getReview(reviewId);
      console.log(resp.data);
      setInitialValues(resp.data);
    } catch (err) {
      console.log(err);
      toast(err.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  const removeReview = async () => {
    setDeleting(true);
    try {
      await deleteReview(reviewId);
      toast("Review was deleted successfully");
      navigate(-1);
    } catch (err) {
      console.log(err);
      toast(err.response.data.message);
    } finally {
      setDeleting(false);
    }
  };

  const handleDelete = () => {
    alertify.confirm(
      "Deleting",
      "Are you sure want to delete?",
      () => {
        removeReview();
      },
      () => {}
    );
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <Form noValidate onSubmit={formik.handleSubmit}>
      <Row>
        <Form.Group as={Col} md={4} lg={3} className="mb-3">
          <Form.Label>review</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter review"
            {...formik.getFieldProps("review")}
            isInvalid={!!formik.errors.review}
          />
          <Form.Control.Feedback type="invalid">
            {formik.errors.firstName}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group as={Col} md={4} lg={3} className="mb-3">
          <Form.Label>status</Form.Label>
          <Form.Control
            type="text"
            placeholder="status"
            {...formik.getFieldProps("status")}
            isInvalid={!!formik.errors.status}
          />
          <Form.Control.Feedback type="invalid">
            {formik.errors.lastName}
          </Form.Control.Feedback>
        </Form.Group>
      </Row>

      <div className="text-end">
        <ButtonGroup aria-label="Basic example">
          <Button variant="primary" type="submit" disabled={saving}>
            {saving && <Spinner animation="border" variant="light" size="sm" />}
            Save
          </Button>
          <Button
            type="button"
            variant="danger"
            disabled={deleting}
            onClick={handleDelete}
          >
            
            Delete
          </Button>
        </ButtonGroup>
      </div>
    </Form>
  );
};
