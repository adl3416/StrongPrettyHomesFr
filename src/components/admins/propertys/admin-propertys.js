import React, { useEffect, useState } from "react";
import DataTable ,{ createTheme } from "react-data-table-component";
import { Link, useNavigate } from "react-router-dom";
import { getProperties } from "../../../api/property-service";
import fileDownload from "js-file-download";
import { Button, ButtonGroup, Spinner } from "react-bootstrap";
import { downloadProperties } from "../../../api/admin-property-service";

const AdminPropertys = () => {

  const [loading, setLoading] = useState(false);
  const [properties, setProperties] = useState([]);
  const navigate = useNavigate();
  const [downloading, setDownloading] = useState(false);


  const loadData = async () => {
    try {
      setLoading(true);
      const resp = await getProperties();
      console.log(resp.data);
      setProperties(resp.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (row) => {
    navigate(`/admin/properties/${row.id}`);
  };

  useEffect(() => {
    loadData();
  }, []);

  createTheme('solarized', {
  text: {
    primary: '#000000',
    secondary: '#000000',
  },
  background: {
    default: '#f4f4f4',
  },
  
  divider: {
    default: '#000000',
  },
  action: {
    button: 'rgba(0,0,0,.54)',
    hover: 'rgba(0,0,0,.08)',
    disabled: 'rgba(0,0,0,.12)',
  },
 
}, 'dark');

  const columns = [
    
    {
      name: "Property",
      selector: (row) => row.category,
      sortable: true,
      
    },
    {
      name: "Type",
      selector: (row) => row.type,
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) => row.status,
      sortable: true,
    },
    {
      name: "Price",
      selector: (row) => row.price,
      sortable: true,
    },
    {
      name: "Country",
      selector: (row) => row.country,
      sortable: true,
    },
    {
      name: "City",
      selector: (row) => row.city,
      sortable: true,
    },
    {
      name: "District",
      selector: (row) => row.district,
      sortable: true,
    },
    {
      name: "Area",
      selector: (row) => row.area + " m²",
      sortable: true,
    },

  ];

  const handleDownload = async () => {
    try {
      setDownloading(true);
      const resp = await downloadProperties();
      fileDownload(resp.data, "properties.xlsx");
    } catch (err) {
      console.log(err);
    } finally {
      setDownloading(false);
    }
  };

  return (
      <div>
      <ButtonGroup aria-label="Basic example">
        <Button variant="primary" as={Link} to="/admin/properties/new">
          New Property
        </Button>
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
        title="Properties"
        columns={columns}
        data={properties} 
        progressPending={loading}
        pagination
        onRowClicked={handleEdit}
        theme="solarized"
        
      />
    </div>
  )
}

export default AdminPropertys