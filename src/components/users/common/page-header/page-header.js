import React from 'react'
import "./page-header.css";

const PageHeader = ({title},{height=160}) => {
  return (
    <div className="page-header" style={{height: height}}>
        <h1>{title}</h1>
    </div>
  )
}


export default PageHeader;

