import React from "react";
import { useParams } from "react-router-dom";
import PageHeader from "../../components/users/common/page-header/page-header";
import {Spacer} from "../../components/users/common/spacer/spacer";
import TourRequestDetails from "../../components/users/reservations/tourrequest-details";

const UserTourRequestDetailsPage = () => {
  const { tourrequestId } = useParams();

  return (
    <>
      <PageHeader title="Tourrequest Details" />
      <Spacer />
      <TourRequestDetails tourrequestId={tourrequestId} />
      <Spacer />
    </>
  );
};

export default UserTourRequestDetailsPage;
