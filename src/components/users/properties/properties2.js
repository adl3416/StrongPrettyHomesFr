import React, {useState} from "react";
import { useStore } from "../../../store";
import PropertyCard from "../common/property-card/property-card";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import {AiOutlineSearch} from 'react-icons/ai'
import { searchProperties } from "../../../api/property-service";

const Properties = () => {
  const [formData, setFormData] = useState({
    /* type: "",
    category: "", */
    bedrooms: "",
    bathrooms: "",
    country: "",
    city:"",
    district:"",
    lowPrice:"",
    highPrice:""
  });
  const [searchState,setSearchState] = useState(true);
  const [validated, setValidated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchedProps,setSearchedProps] = useState([]);

  const { propertyState } = useStore();
  const { properties } = propertyState;

  const handleFormData = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    console.log(formData);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setValidated(true);
    if (e.target.checkValidity() === false) {
      return;
    }
    
    setLoading(true);

   loadData();
    
  };

  const loadData =() => { /* async () => {  */
  const { type, category, bathrooms, bedrooms, lowPrice, highPrice, city } =
  formData;

    let propSearched=[];
    if (type) {
     
      propSearched = properties.filter((item) => item.type == type);
      if (category)
        propSearched = propSearched.filter((item) => item.category == category);
      if (bathrooms)
        propSearched = propSearched.filter(
          (item) => item.bathrooms == bathrooms
        );
      if (bedrooms)
        propSearched = propSearched.filter((item) => item.bedrooms == bedrooms);
      if (lowPrice)
        propSearched = propSearched.filter((item) => item.price >= lowPrice);
      if (highPrice)
        propSearched = propSearched.filter((item) => item.price <= highPrice);
      if (city) propSearched = propSearched.filter((item) => item.city == city);
    }
    if(!type&&category){
      propSearched = properties.filter((item) => item.category == category);
      if (bathrooms)
        propSearched = propSearched.filter(
          (item) => item.bathrooms == bathrooms
        );
      if (bedrooms)
        propSearched = propSearched.filter((item) => item.bedrooms == bedrooms);
      if (lowPrice)
        propSearched = propSearched.filter((item) => item.price >= lowPrice);
      if (highPrice)
        propSearched = propSearched.filter((item) => item.price <= highPrice);
      if (city) propSearched = propSearched.filter((item) => item.city == city);
    }
    if (!type&&!category&&bathrooms) {
      propSearched = properties.filter((item) => item.bathrooms == bathrooms);
      if (bedrooms)
        propSearched = propSearched.filter((item) => item.bedrooms == bedrooms);
      if (lowPrice)
        propSearched = propSearched.filter((item) => item.price >= lowPrice);
      if (highPrice)
        propSearched = propSearched.filter((item) => item.price <= highPrice);
      if (city) propSearched = propSearched.filter((item) => item.city == city);
    }
    if (!type&&!category&&!bathrooms && bedrooms) {
      propSearched = properties.filter((item) => item.bedrooms == bedrooms);
      if (lowPrice)
        propSearched = propSearched.filter((item) => item.price >= lowPrice);
      if (highPrice)
        propSearched = propSearched.filter((item) => item.price <= highPrice);
      if (city) propSearched = propSearched.filter((item) => item.city == city);
    }
    if (!type&&!category&&!bathrooms && !bedrooms && lowPrice) {
      propSearched = properties.filter((item) => item.price >= lowPrice);
      if (highPrice)
        propSearched = propSearched.filter((item) => item.price <= highPrice);
      if (city) propSearched = propSearched.filter((item) => item.city == city);
    }
    if (!type && !category && !bathrooms && !bedrooms && !lowPrice && highPrice) {
      propSearched = properties.filter((item) => item.price <= highPrice);
      if (city) propSearched = propSearched.filter((item) => item.city == city);
    }
    if (!type && !category && !bathrooms && !bedrooms && !lowPrice && !highPrice && city) {
      propSearched = properties.filter((item) => item.city == city);
    }
    if (propSearched.length <= 0) setSearchState(false);
    setSearchedProps(propSearched);
    
    }

  return (
    <Container>
      <Row className="g-5">
        <Col md={3} px-3>
          <Form noValidate onSubmit={handleSubmit}>
            <Form.Group className="mb-2">
              <Form.Select id="disabledSelect" name="type" value={formData.type} onChange={handleFormData}>
                <option>Type</option>
                <option value="SALE">For Sale</option>
                <option value="RENT">For Rent</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Select id="disabledSelect" name="category" value={formData.category} onChange={handleFormData}>
                <option>Category</option>
                <option value="VILLA">Villa</option>
                <option value="HOUSE">House</option>
                <option value="LAND">Land</option>
              </Form.Select>
            </Form.Group> 
              <Form.Group className="mb-3">
              <Form.Control type="text" placeholder="Bedrooms" name="bedrooms" value={formData.bedrooms} onChange={handleFormData}/>
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Control type="text" placeholder="Bathrooms" name="bathrooms" value={formData.bathrooms} onChange={handleFormData} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control type="text" placeholder="Country" name="country" value={formData.country} onChange={handleFormData}/>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control type="text" placeholder="City" name="city" value={formData.city} onChange={handleFormData}/>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control type="text" placeholder="District" name="district" value={formData.district} onChange={handleFormData}/>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control type="number" placeholder="Min Price" name="lowPrice" value={formData.lowPrice} onChange={handleFormData}/>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control type="number" placeholder="Max Price" name="highPrice" value={formData.highPrice} onChange={handleFormData}/>
            </Form.Group>
            <Button className="btn btn-lg" variant="primary" type="submit">
              <AiOutlineSearch /> Search
            </Button>
          </Form>
        </Col>
        <Col md={9}>
          <Row>
          {searchedProps.length<=0 ? 
          (searchState ? properties.map((property, index) => (
                <Col key={index} md={6}>
                  <PropertyCard property={property} />
                </Col>
              )) :  
              <Col>
              <Alert variant="warning">
                No property found matching your search criteria
              </Alert>
              </Col>)
           :
          searchedProps.map((property, index) => (
                <Col key={index} md={6}>
                  <PropertyCard property={property} />
                </Col>
              ))
          }

      {/*       {!formData ? (properties.map((property, index) => (
                <Col key={index} md={6}>
                  <PropertyCard property={property} />
                </Col>
              )))
            : (searchedProps ? 
                (
                searchedProps.map((property, index) => 
                (<Col key={index} md={6}>
                <PropertyCard property={property} />
              </Col>
            ))) : (
              <Col>
              <Alert variant="warning">
                No property found matching your search criteria
              </Alert>
              </Col>))} */}
           
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default Properties;
