import React from 'react'
import Footer from '../components/users/common/footer/footer'
import { Mainnavbar } from '../components/users/common/header/main-navbar'

export const UserTemplate = ({children}) => {
  return (
    <>
    <Mainnavbar/>
    {children}
    <Footer/>

    
    
    
    </>
  )
}
