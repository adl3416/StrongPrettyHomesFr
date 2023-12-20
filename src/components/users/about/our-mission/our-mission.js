import React from "react";
import SectionHeader from "../../common/section-header/section-header";
import mission from '../../../../assets/img/bg/mission.jpg'
import {Container,Row,Col} from 'react-bootstrap'
import './our-mission.css'


const OurMission = () => {
  return (
    <>
      <SectionHeader
        title="Our Mission Is To FindHouse"
        desc="Wide Renge Of Properties"
      />
      <Container className="our-mission">
        <Row>
          <Col md={8}>
            <p>
              <b>
                Mauris ac consectetur ante, dapibus gravida tellus. Nullam
                aliquet eleifend dapibus. Cras sagittis, ex euismod lacinia
                tempor.
              </b>
            </p>
            <br /> <br />
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
              quis ligula eu lectus vulputate porttitor sed feugiat nunc. Mauris
              ac consectetur ante, dapibus gravida tellus. Nullam aliquet
              eleifend dapibus. Cras sagittis, ex euismod lacinia tempor, lectus
              orci elementum augue, eget auctor metus ante sit amet velit.
            </p>
            <br /> <br />
            <p>
              Maecenas quis viverra metus, et efficitur ligula. Nam congue augue
              et ex congue, sed luctus lectus congue. Integer convallis
              condimentum sem. Duis elementum tortor eget condimentum tempor.
              Praesent sollicitudin lectus ut pharetra pulvinar. Donec et libero
              ligula. Vivamus semper at orci at placerat.Placeat Lorem ipsum
              dolor sit amet, consectetur adipisicing elit. Quod libero amet,
              laborum qui nulla quae alias tempora.
            </p><br/> <br />
            <ul className="row">
                  <li className="col-4">
                  
                      <div>
                          <span>80,123</span><br/>
                          <span>Customers to date</span>
                      </div>
                  </li>
                  <li className="col-4">
                     
                      <div>
                          <span>$74 Billion</span><br/>
                          <span>In home sales</span>
                      </div>
                  </li>
                  <li className="col-4">
                     
                      <div>
                          <span>$468 Million</span><br/>
                          <span>In Savings</span>
                      </div>
                  </li>
              </ul>
          </Col>
          <Col md={4}>
              <img src={mission} className="img-fluid"/>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default OurMission;
