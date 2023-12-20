import React from 'react';
import "./testimonal.css"; 
 
const Testimonal = ({image,name,title,message}) => {
    
    const imageSrc = require(`../../../../assets/img/testimonals/${image}`)
    

  return (
    
    <div className="testimonal">
        <br></br>
       <div className="avatar"> <img src={imageSrc}/></div>
        <br></br>
        <h5>{name}</h5>
        <span>{title}</span>
        <br></br>
        <br></br>
        <p>{message}</p>
    </div>
       
  )
}

export default Testimonal