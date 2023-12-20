import React from 'react'
import PageHeader from '../../components/users/common/page-header/page-header'
import { Spacer } from '../../components/users/common/spacer/spacer'
import UserReviews from '../../components/users/user-reviews/user-reviews'
const UserReviewsPage = () => {
  return (
    <>
    <PageHeader title="Reviews"/>
    <Spacer/>
    <UserReviews/>
    <Spacer/>
</>
  )
}
export default UserReviewsPage