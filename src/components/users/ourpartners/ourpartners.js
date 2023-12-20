import React from 'react'
import "./ourpartners.css"
import SectionHeader from '../common/section-header/section-header'
import logo4 from "../../../assets/img/logo/lg1.png"
import logo5 from "../../../assets/img/logo/lg2.png"
import logo6 from "../../../assets/img/logo/lg3.png"
import logo7 from "../../../assets/img/logo/lg4.png"
import logo8 from "../../../assets/img/logo/lg5.png"
const OurPartners = () => {
   
  return (<>
    <section className="ourpartners">
    <SectionHeader className="title" title ="Our Partners" desc="We only  work with the best companies around the globe.."/>


<div className="partners container">
 <div className="row">
   <div className="col">
      <div className="img-fluid"> <img src={logo4} width= "111vh" />
         </div>
   </div>
   <div className="col">
      <div className="img-fluid"> <img src={logo5} width= "111vh" />
         </div>
   </div>
   <div className="col">
      <div className="icon"> <img src={logo6} width= "92vh" />
         </div>
   </div>
   <div className="col">
      <div className="icon"> <img src={logo7} width= "101vh" />
         </div>
   </div>
   <div className="col">
      <div className="icon"> <img src={logo8} width= "101vh" />
         </div>
   </div>

   
 </div>
</div>
  </section>
</>)
}

export default OurPartners;