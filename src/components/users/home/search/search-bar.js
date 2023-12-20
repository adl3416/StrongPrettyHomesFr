import React, { useEffect, useState } from "react";
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  ToggleButton,
  Collapse,
  Spinner,
} from "react-bootstrap";
import "./search-bar.css";
import { AiOutlineSearch } from "react-icons/ai";
import { FcExpand } from "react-icons/fc";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useStore } from "../../../../store";
import { useNavigate, useParams } from "react-router-dom";
import { setSearchProperties } from "../../../../store/search/searchActions";
import "./status-type.css";
import { searchInitialState } from "../../../../store/search/searchInitialState";
import LoadingPage from "../../../../pages/users/LoadingPage";
import { getSearchProperties } from "../../../../api/property-service";
import { setSearchForm } from "../../../../store/search-form/searchFormActions";


const Search = ({setDefaultTab}) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false); 
  const navigate = useNavigate();
  const {dispatchSearchForm} = useStore();
  const [isActive, setIsActive] = useState(false);
  const [type, setType] = useState("");
  const [search, setSearch] = useState({});
  const {searchModel} =useParams();
  const initialValues = {
    
   type:"",
   category:  "",
   lowPrice:  "",
   highPrice:  "",
   bedrooms:  "",
   bathrooms: "",
   location:  "",
   country:   "",
   city:      "",
   district:  "",
  };
  const validationSchema = Yup.object({
    type: Yup.string(),
    category: Yup.string(),
    lowPrice: Yup.number(),
    highPrice: Yup.number(),
    bedrooms: Yup.number(),
    bathrooms:Yup.number(),
    location: Yup.string(),
    country:  Yup.string(),
    city:     Yup.string(),
    district: Yup.string(),
  
  });
    const onSubmit= async(valuesSearch) => {
    const {type, category, lowPrice, highPrice,bedrooms, bathrooms, location, country, city, district }= valuesSearch;
    setLoading(true);
      console.log(valuesSearch)
   try {
     dispatchSearchForm(setSearchForm(valuesSearch))


   navigate("/properties")
    setLoading(false);
    
   } 
   catch (err) {
    console.log(err);
    setLoading(false);
   }
 
}
const formik = useFormik({
  initialValues,
  validationSchema,
  onSubmit,
})

/* const loadData = async () =>  { 
  try {
   let resp = await getSearchProperties(searchModel);
   searchInitialState(resp.data);
   
  }
   catch (err) {
    console.log(err);
    setLoading(false);
  }
}
useEffect(() => {
  loadData();
 
},[]) */

/* const loadData = async () =>  { 
  try {
   let resp = await getSearchProperties(searchModel);
   searchInitialState(resp.data);
   
  }
   catch (err) {
    console.log(err);
    setLoading(false);
  }
}
useEffect(() => {
  loadData();
 
},[]) */


if(loading) 
return(<LoadingPage/>)


const handleClick1 = event => {   
  setIsActive(true);  
  setType("RENT");
  formik.setFieldValue("type", "RENT");
}

const handleClick2 = event => {    
setIsActive(false);
setType("SALE");
formik.setFieldValue("type", "SALE");
}


  return (

    <>
     <Form className="search-form g-3" noValidate onSubmit={formik.handleSubmit} >
     <div className="status-bar">
     <div className={isActive ? 'active' : 'passive'} onClick={handleClick1}>Rent</div>
     <div className={isActive ? 'passive' : 'active'} onClick={handleClick2}>Sale</div>
     </div>
     <div className="transparent" >
      <div className="search-bar ">
       
          <Row>
          <Col lg={2}>
            <Form.Group className="mb-3">
             
            </Form.Group>
          </Col>
          <Col lg={2}>
            <Form.Group className="mb-2">
              <Form.Select {...formik.getFieldProps("category")}
            
              >  
                <option value="">Category</option>
                <option value="VILLA">Villa</option>
                <option value="HOUSE">House</option>
                <option value="LAND">Land</option> 
              </Form.Select>
            </Form.Group>
          </Col>
          <Col lg={2}>
            <Form.Group className="mb-3">
              <Form.Control type="number" placeholder="Low Price"  {...formik.getFieldProps("lowPrice")} />
            </Form.Group>
          </Col>
          <Col lg={2}>
            <Form.Group className="mb-3">
              <Form.Control type="number" placeholder="High Price" {...formik.getFieldProps("highPrice")} />
            </Form.Group>
          </Col>
          <Col lg={2}>
             <span> Advanced &nbsp;&nbsp;</span>
            <ToggleButton
              className="advance-search-btn"
              onClick={() => setOpen(!open)}
              aria-controls="example-collapse-text"
              aria-expanded={open}
              variant="success"
            > <FcExpand />
            </ToggleButton>
          </Col>
          <Col lg={2}>
          <Button type="submit" disabled={loading}>
            {loading && <Spinner animation="border" size="sm" />}Search<AiOutlineSearch />
         </Button>
        
        </Col>
      <Collapse in={open}>
      <div id="example-collapse-text">
        <div className="transparent">
          <div className="search-bar">
            <Form className="search-form g-3">
              <Row>
            <Col lg={2}>
            <Form.Group className="mb-3">
              <Form.Control type="number" placeholder="Bedrooms" {...formik.getFieldProps("bedrooms")}/>
             
            </Form.Group>
          </Col>
          <Col lg={2}>
            <Form.Group className="mb-2">
              <Form.Control type="number" placeholder="Bathrooms" {...formik.getFieldProps("bathrooms")}/>
            </Form.Group>
          </Col>
          <Col lg={2}>
            <Form.Group className="mb-3">
              <Form.Control type="text" placeholder="Location" {...formik.getFieldProps("location")}/>
            </Form.Group>
          </Col>
          <Col lg={2}>
            <Form.Group className="mb-3">
              <Form.Control type="text" placeholder="Country" {...formik.getFieldProps("country")}/>
            </Form.Group>
          </Col>
          <Col lg={2}>
            <Form.Group className="mb-3">
              <Form.Control type="text" placeholder="City" {...formik.getFieldProps("city")}/>
            </Form.Group>
          </Col>
          <Col lg={2}>
            <Form.Group className="mb-3">
              <Form.Control type="text" placeholder="District" {...formik.getFieldProps("district")} />
            </Form.Group>
          </Col>
          </Row>
            </Form>
          </div>
        </div>
      </div>
    </Collapse>
</Row>  
      </div>
       </div>
      </Form>

  </>

);
};
export default Search;