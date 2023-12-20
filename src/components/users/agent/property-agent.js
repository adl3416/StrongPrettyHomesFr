import React from 'react'
import { Card } from 'react-bootstrap';
import { MdOutlineSmartphone,MdOutlineMailOutline } from "react-icons/md";
import "./property-agent.css";
import { Link } from "react-router-dom";
import { Container,Col,Row } from "react-bootstrap";

const PropertyAgent = ({ agent }) => {
	const { firstName, lastName, phoneNumber, email, agentImage } = agent;
   
	let img = `${process.env.REACT_APP_API_URL}/agentImg/display/${agentImage.id}`;

	return (
		<div className="agent">
		
				<h2>Agent Information</h2>
				
		<div className="main-card">
			<div >
		
				<Card variant="top" className="agent-card">
					<div className="image-container">
						<Card.Img  className="rounded-pill"  variant="top" src={img} />
					</div>
					
					<Card.Body className="card-body ">
						<div>
							<div className="name"> <b>{firstName}</b>&nbsp;
							<b>{lastName}</b>
                            </div>

							<div className="telephone"><MdOutlineSmartphone/>
							<Link to="#">{phoneNumber}</Link>
        					
							</div>
                            <div className="email"><MdOutlineMailOutline/>
							<Link to="#">{email}</Link>
							
							</div>
						</div>
					
					</Card.Body>
				</Card>
			</div>
			  </div>
			</div>
	);
};

export default PropertyAgent;
