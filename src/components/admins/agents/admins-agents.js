import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import { Button, ButtonGroup, Spinner } from "react-bootstrap";
import DataTable from "react-data-table-component";

import fileDownload from "js-file-download";
import { downloadAgents, getAgents } from '../../../api/admin-agent-service';


export const AdminsAgents = () => {
  const [agents, setAgents] = useState([]);
  const [loadingAgents, setLoadingAgents] = useState(true);
  const [loadingDownload, setLoadingDownload] = useState(false);
  const navigate = useNavigate();

  const loadData = async () => {
    try {
      const resp = await getAgents();
      setAgents(resp.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoadingAgents(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const columns = [
    {
      name: "First Name",
      selector: (row) => row.firstName,
      sortable: true,
    },
    {
      name: "Last Name",
      selector: (row) => row.lastName,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: "PhoneNumber",
      selector: (row) => row.phoneNumber,
      sortable: true,
    },
  ];

  const customStyles = {
    rows: {
      style: {
        minHeight: "72px", // override the row height
      },
    },
    headCells: {
      style: {
        paddingLeft: "8px", // override the cell padding for head cells
        paddingRight: "8px",
        backgroundColor: "gray",
        color: "white",
      },
    },
    cells: {
      style: {
        paddingLeft: "8px", // override the cell padding for data cells
        paddingRight: "8px",
      },
    },
  };

  const handleDownload = async () => {
    try {
      setLoadingDownload(true);
      const resp = await downloadAgents();
      fileDownload(resp.data, "agents.xlsx");
    } catch (err) {
      console.log(err);
    } finally {
      setLoadingDownload(false);
    }
  };

  const handleEdit = (row) => {
    navigate(`/admin/agents/${row.id}`);
  };

  return (
    <div className="w-100">
      <ButtonGroup aria-label="Basic example">
        <Button variant="primary" as={Link} to="/admin/agents/new">New Agent</Button>
        <Button
          variant="secondary"
          onClick={handleDownload}
          disabled={loadingDownload}
        >
          {loadingDownload && <Spinner animation="border" size="sm" />}
          Download List
        </Button>
      </ButtonGroup>

      <DataTable
        title="Agents"
        columns={columns}
        data={agents}
        pagination
        customStyles={customStyles}
        progressPending={loadingAgents}
        onRowClicked={handleEdit}
      />
    </div>
  );
};
