import React from 'react'
import PageHeader from '../../components/users/common/page-header/page-header'
import {Spacer} from '../../components/users/common/spacer/spacer'
import TourRequests from '../../components/users/reservations/tourrequests'


const UserTourRequestsPage = () => {
  return (
    <>
        <PageHeader title="Tourrequests"/>
        <Spacer/>
        <TourRequests/>
        <Spacer/>
    </>
  )
}

export default UserTourRequestsPage