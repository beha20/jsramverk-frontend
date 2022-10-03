import React from 'react'
import { Button, Col, Container, Nav, Row } from 'react-bootstrap'
import { useNavigate } from "react-router-dom";
function Main() {
    const navigate = useNavigate();
  return (
    <Container style={{background: "rgb(91 103 131)", color:"white", margin:"100px auto ", height:"300px", display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center"}}>
        <Row style={{textAlign:"center", }}>
            <h1>Wellcome to Awsome Text Editor</h1>
        </Row>
        <Row >
        <Col>
        <Button className="m-4" variant="dark" onClick={() => navigate('/create')}>Create Document</Button>
            <Button variant="dark" onClick={() => navigate('/docs')}>All Documents</Button>
       
        </Col>
         </Row>
    </Container>
  )
}

export default Main