import React from "react";
import "./unauthorized.css";

const Unauthorized = () => {
  return (
    <>
    <div className="error">404</div>
    <br /><br />
    <span className="info">Page not found.</span>
    <img src="http://images2.layoutsparks.com/1/160030/too-much-tv-static.gif" className="static" />
    </>
  );
};

export default Unauthorized;