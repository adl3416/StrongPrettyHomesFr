import React, { useEffect, useState } from 'react'
import DataTable from "react-data-table-component";
import { useNavigate } from "react-router-dom";
import { downloadTours, getTourRequests } from '../../../api/admin-tourrequest-service';
import { Button, ButtonGroup, Spinner } from "react-bootstrap";
import fileDownload from "js-file-download";

const AdminTourRequests = () => {

  const [loading, setLoading] = useState(true);
  const [tours, setTours] = useState([]);
  const navigate = useNavigate();
  const [downloading, setDownloading] = useState(false);
  
  const handleDownload = async () => {
    try {
      setDownloading(true);
      const resp = await downloadTours();
      fileDownload(resp.data, "tours.xlsx");
      
    } catch (err) {
      console.log(err);
    }
    finally{
      setDownloading(false);
    }

  };


  const loadData = async () => {
    try {
      const resp=await getTourRequests();
      setTours(resp.data);
      console.log(resp.data);
    } catch (err) {
      console.log(err);
    }finally {
      setLoading(false);
    }
  };

  useEffect(() =>{
    loadData();
  },[]);

  const columns = [
    {
      name: "TourRequest Time",
      selector: (row) => row.tourRequestTime,
      sortable: true,
    },
    {
      name: "Property",
      selector: (row) => row.property.category,
      sortable: true,
    },
    {
      name: "Type",
      selector: (row) => row.property.type,
      sortable: true,
    },
    {
      name: "Location",
      selector: (row) => row.property.location,
      sortable: true,
    },
    {
      name: "Visitors",
      selector: (row) => row.adult,
      sortable: true,
    },
    
    {
      name: "Agent",
      selector: (row) => row.property.agent.firstName,
      sortable: true,
    },
    {
      name: "Property Status",
      selector: (row) => row.property.status,
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) => row.status,
      sortable: true,
    },
  ];

  const handleEdit = (row) => {
    navigate(`/admin/tourrequest/${row.id}`);
  };

  const conditionalRowStyles = [
  {
    when: row => row.property.type === "SALE",
    style: {
      backgroundColor: 'floralwhite',
      color: 'black',
      hover: {
        cursor: 'pointer',
      },
    },
  },
  
  {
    when: row => row.property.type === "RENT",
    style: {
      backgroundColor: 'silver',
      color: 'black',
      '&:hover': {
        cursor: 'pointer',
      },
  },}
];

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
        title="Tour Requests"
        columns={columns}
        data={tours}
        progressPending={loading}
        pagination
        onRowClicked={handleEdit}
        conditionalRowStyles={conditionalRowStyles}
      />
    </div>
  )
}

export default AdminTourRequests