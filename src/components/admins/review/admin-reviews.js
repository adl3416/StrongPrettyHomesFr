import fileDownload from "js-file-download";
import React, { useEffect, useState } from "react";
import { Button, ButtonGroup, Spinner } from "react-bootstrap";
import DataTable from "react-data-table-component";
import { Link, useNavigate } from "react-router-dom";
import { downloadReviews, getReviews } from "../../../api/admin-review-service";


const AdminReviews = () => {
  const [downloading, setDownloading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState([]);
  const navigate = useNavigate();

  const handleDownload = async () => {
    try {
      setDownloading(true);
      const resp = await downloadReviews();
      fileDownload(resp.data, "reviews.xlsx");
      
    } catch (err) {
      console.log(err);
    }
    finally{
      setDownloading(false);
    }

  };

  const loadData = async () => {
    try {
      const resp = await getReviews();
      setReviews(resp.data);
      console.log(resp.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const columns = [
    {
      name: "Review",
      selector: (row) => row.review,
      sortable: true,
    },
    {
      name: "score",
      selector: (row) => row.score,
      sortable: true,
    },
    {
      name: "status",
      selector: (row) => row.status,
      sortable: true,
    },
    {
      name: "propertyId",
      selector: (row) => row.propertyId,
      sortable: true,
      /* format: (row)=> `$ ${row.totalPrice.toLocaleString()}` */
    },
    {
      name: "Status",
      selector: (row) => row.review,
      sortable: true,
    },
  ];

  const handleEdit = (row) => {
    navigate(`/admin/reviews/${row.id}`);
  };

  return (
    <div>
      <ButtonGroup aria-label="Basic example">
        <Button
          variant="secondary"
          onClick={handleDownload}
          disabled={downloading}
        >
          {downloading && <Spinner animation="border" size="sm" />}
          Download List
        </Button>
      </ButtonGroup>

      <DataTable
        title="Reviews"
        columns={columns}
        data={reviews}
        progressPending={loading}
        pagination
        onRowClicked={handleEdit}
      />
    </div>
  );
};

export default AdminReviews;