import React from 'react'
import { Container } from 'react-bootstrap'

const SearchProperties = () => {
  const { searchState }= useStore();
  const {searchies}= searchState();
 

  return (
    <Container>
      <Row className="g-4">
        {searchies.map((search, index) => (
          <Col key={index} md={6} lg={4}>
            <PropertyCard search={search} />
          </Col>
        ))}
      </Row>
    </Container>
  )
}

export default SearchProperties