import React from 'react'
import { Spinner } from 'react-bootstrap'
import logo from "../../../assets/img/logo/logo.png";
import "./loading.css"

const Loading = () => {
  return (
    <div className="loading-page">
      <Spinner animation="border" variant="success"/>
      <img src={logo}/>

    </div>
  )
}

export default Loading