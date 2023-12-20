import React from 'react'
import Auth from '../../components/users/auth/auth'
import PageHeader from '../../components/users/common/page-header/page-header'

const AuthPage = () => {
  return (
    <>
    <PageHeader title="Login/Register"/>
    <Auth/>
    </>
  )
}

export default AuthPage