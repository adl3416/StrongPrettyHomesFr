import React from 'react'
import Unauthorized from '../../components/common/unauthorized/unauthorized'
import PageHeader from '../../components/users/common/page-header/page-header'
import { Spacer } from '../../components/users/common/spacer/spacer'

const UnAuthorizedPage = () => {
  return (
    <>
    <PageHeader title="Unauthorized"/>
    <Spacer/>
    <Spacer/>
    <Unauthorized/>
    <Spacer/>

    </>
  )
}

export default UnAuthorizedPage