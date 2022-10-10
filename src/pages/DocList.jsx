import React from "react";
import { Col, Container, Row, Button } from "react-bootstrap";
import DocCard from "../components/DocCard";
import useCurrentUser from "../hooks/useCurrentUser";
import {useNavigate} from "react-router-dom";

function DocList({ docs }) {
  const navigate = useNavigate();
  const currentUser = useCurrentUser();
  if (!currentUser || currentUser === {}) {
      navigate("/login");
  }

  const docCards = docs.map((doc, index) => {
    return (
      <DocCard
          key={index}
          doc={doc}
      />
    );
  });
  if (docCards.length > 0) {
    return (<Container style={{margin:"40px auto"}}>
        <Row style={{borderBottom:"3px solid black", marginBottom:"20px"}}>
            <Col md={4}><h4>Document Name</h4></Col>
            <Col md={4}><h4>Content</h4></Col>
            <Col md={4}><h4>Action</h4></Col>
        </Row>
        <Row>
            {docCards}
        </Row>
        <Row className="text-center">
            <Col>
                <Button variant="dark"  style={{padding:"5px 40px"}} onClick={() => navigate('/')} >
                    Main
                </Button>
            </Col>
        </Row>
    </Container>);
  } else {
    return (
      <Container>
        <Row>
          <Col>
            <h3 className="text-danger">No documents are in the database or Invaild Token</h3>
            <Button variant="dark" onClick={() => navigate('/')}>Main</Button>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default DocList;
