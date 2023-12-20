import React, { useState } from 'react'
import { Tab, Tabs } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Search from './search-bar';
const AuthSearch = () => {
    const navigate = useNavigate();
    const [defaultTab, setDefaultTab] = useState("search");
  
  return (
              <Tabs
                activeKey={defaultTab}
                onSelect={(k) => setDefaultTab(k)}
                className="mb-3"
              >
                <Tab eventKey="search" title="Search">
                  <Search setDefaultTab={setDefaultTab}/>
                </Tab>
               
              </Tabs>
  )
}
export default AuthSearch