import React from 'react'
import { useParams } from 'react-router-dom';
import PageHeader from '../../components/users/common/page-header/page-header';
import { Spacer } from '../../components/users/common/spacer/spacer';
import UserReviewEdit from '../../components/users/user-reviews/user-review-edit'

const UserReviewEditPage = () => {
 
    const { reviewId } = useParams();
    return (
      <>
      <PageHeader title="Review Edit" />
      <Spacer />
      <UserReviewEdit reviewId={reviewId}/>
      <Spacer />
      
    </>
  )
}

export default UserReviewEditPage