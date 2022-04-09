import React, { Children } from 'react'
import { Row, Col, Container} from 'react-bootstrap'

function FormComponent({children}) {
  return (
    <Container>
        <Row className = 'justify-content-md-center'>
            <Col md = {6}>
                {children}
            </Col>
        </Row>
    </Container>
  )
}

export default FormComponent