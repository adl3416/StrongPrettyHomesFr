import React, { useState,useEffect } from "react";
import { useStore } from "../../../store";
import PropertyCard from "../common/property-card/property-card";
import { Container, Row, Col, Form, Button, Alert,Spinner } from "react-bootstrap";
import { AiOutlineSearch } from "react-icons/ai";
import { getSearchProperties, searchProperties } from "../../../api/property-service";
import { setSearchForm } from "../../../store/search-form/searchFormActions";
import LoadingPage from "../../../pages/users/LoadingPage";

const Properties = () => {
  const {searchState,dispatchSearch} = useStore();
  const { searchies } = searchState;
  const {searchFormState,dispatchSearchForm} = useStore();
  const {searchForm} = searchFormState;
  const [formData, setFormData] = useState({
    type: "",
    category: "",
    bedrooms: "",
    bathrooms: "",
    country: "",
    city: "",
    district: "",
    lowPrice: "",
    highPrice: "",
  });
  const [searchStatus, setSearchStatus] = useState(true);
  const [validated, setValidated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchedProps, setSearchedProps] = useState([]);
 
  
  const { propertyState } = useStore();
  const { properties } = propertyState;

 
  

  const handleFormData = (e) => {
    
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    console.log(formData)
  };
  const handleSubmit =async (e) => {
    e.preventDefault();
    setValidated(true);
    if (e.target.checkValidity() === false) {
      return;
    }

    setLoading(true);
    const resp =await getSearchProperties(formData);
    setSearchedProps(resp.data)
    setLoading(false)
  };

  const loadData = /* () => { */
    async () => { 
    const { type, category, bathrooms, bedrooms, lowPrice, highPrice, city } =
      formData;
    /*  const resp = await searchProperties(bathrooms,bedrooms,lowPrice,highPrice,city);
    setSearchedProps(resp.data);
    console.log(resp.data); */
    console.log(searchForm)
    if(Object.keys(searchForm).length > 0){
    setFormData(searchForm)
    const resp =await getSearchProperties(searchForm);
    setSearchedProps(resp.data)
    }
    
  };
  useEffect(() => {
   loadData();
  }, [])
  
  return (
    <Container>
      <Row className="g-5">
        <Col md={3} px-3>
          <Form noValidate onSubmit={handleSubmit}>
            <Form.Group className="mb-2">
              <Form.Select
                id="disabledSelect"
                name="type"
                value={formData.type}
                onChange={handleFormData}
              >
                <option>Type</option>
                <option value="SALE">SALE</option>
                <option value="RENT">RENT</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Select
                id="disabledSelect"
                name="category"
                value={formData.category}
                onChange={handleFormData}
              >
                <option>Category</option>
                <option value="VILLA">VILLA</option>
                <option value="HOUSE">HOUSE</option>
                <option value="LAND">LAND</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                placeholder="Bedrooms"
                name="bedrooms"
                value={formData.bedrooms}
                onChange={handleFormData}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Control
                type="text"
                placeholder="Bathrooms"
                name="bathrooms"
                value={formData.bathrooms}
                onChange={handleFormData}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                placeholder="Country"
                name="country"
                value={formData.country}
                onChange={handleFormData}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                placeholder="City"
                name="city"
                value={formData.city}
                onChange={handleFormData}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                placeholder="District"
                name="district"
                value={formData.district}
                onChange={handleFormData}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                type="number"
                placeholder="Min Price"
                name="lowPrice"
                value={formData.lowPrice}
                onChange={handleFormData}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                type="number"
                placeholder="Max Price"
                name="highPrice"
                value={formData.highPrice}
                onChange={handleFormData}
              />
            </Form.Group>
            <Button className="btn btn-lg" variant="primary" type="submit" disabled={loading}>
            {loading && (
                  <Spinner animation="border" variant="light" size="sm" />
                )}  <AiOutlineSearch /> Search
            </Button>
          </Form>
        </Col>
        <Col md={9}>
          <Row>
          {/*   {
              searchedProps.map((property, index) => (
                <Col key={index} md={6}>
                  <PropertyCard property={property} />
                </Col>
              ))
            } */}
            {Object.keys(searchForm).length > 0 ? (
              searchedProps.length>0 ? (
                searchedProps.map((property, index) => (
                  <Col key={index} md={6}>
                    <PropertyCard property={property} />
                  </Col>
                ))
              ) : (
                <Col style={{fontSize:"2rem"}}>Loading...
              {/*     <Alert variant="warning">
                    No property found matching your search criteria
                  </Alert> */}
                </Col>
              )
            ) : (
              properties.map((property, index) => (
                <Col key={index} md={6}>
                  <PropertyCard property={property} />
                </Col>
              ))
            )} 

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