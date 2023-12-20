import React from "react";
import { Link } from "react-router-dom";
import "./not-found.css";

const NotFound = () => {
  return (

    <div className="not-found">
        
    <h4>Opps! Page not found.</h4>
    <h1>404</h1>
    <p>We can't find the page you're looking for.</p>
    <Link to="/">Go back home</Link>
    </div>
  );
};

export default NotFound;