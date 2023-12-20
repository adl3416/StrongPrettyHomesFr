import React from 'react'
import SectionHeader from '../section-header/section-header'
import "./whychooseus.css"
import logo1 from "../../../../assets/img/logo/whyus1.png"
import logo2 from "../../../../assets/img/logo/whyus2.png"
import logo3 from "../../../../assets/img/logo/whyus3.png"
import data from "./whychooseus.json"


const WhyChooseUs = () => {

  return (<>
     <section className="whychooseus">
     <SectionHeader title="Why Choose Us" desc="We provide full service at every step.."/>


<div className="container">
  <div className="g-4 row">
    <div className="col-lg-4">
      <div className="card">
        <div className="card-body">
          <div className="icon"> <img src={logo1} width= "350vh" />
          <div> <b> Trusted By Thousands</b></div> <br />
          <div>Aliquam dictum elit vitae mauris facilisis at dictum urna dignissim donec vel lectus vel felis.</div>
          </div>
        </div>
      </div>
    </div>

    <div className="col-lg-4">
      <div className="card">
        <div className="card-body">
          <div className="icon"  variant="top" > <img src={logo2} width= "350vh" alt="" />
          <div> <b> Wide Renge Of Properties</b></div> <br />
          <div>Aliquam dictum elit vitae mauris facilisis at dictum urna dignissim donec vel lectus vel felis.</div>
          </div>
        </div>
      </div>
    </div>

    <div className="col-lg-4">
      <div className="card">
        <div className="card-body">
          <div className="icon"  variant="top" > <img src={logo3} width= "350vh" alt="" />
          <div> <b> Financing Made Easy</b></div> <br />
          <div>Aliquam dictum elit vitae mauris facilisis at dictum urna dignissim donec vel lectus vel felis.</div>
          </div>
        </div>
      </div>
    </div>
  </div>


  
</div>





   </section>
 

</>)

}

export default WhyChooseUs;