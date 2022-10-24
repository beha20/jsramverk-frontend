import React from "react";
import { Col, Container, Row, Button } from "react-bootstrap";
import DocCard from "../components/DocCard";
import useCurrentUser from "../hooks/useCurrentUser";
import {useNavigate} from "react-router-dom";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useDocuments from "../hooks/useDocuments";

const DocList = () => {
  const navigate = useNavigate();
  const currentUser = useCurrentUser();
  const {getDocuments} = useDocuments(currentUser?.accessToken);
  const [docs, setDocs] = useState([]);
    
  const getDocs = async () => {
    const {data, isError, error} = await getDocuments();
    if (!isError) {
      setDocs(data);
    } else {
      toast.error(error.message, {
        position: "top-right",
        theme: "dark"
      });
      setDocs([]);
    }
  }

  useEffect(() => {
    if (!currentUser || currentUser === {}) {
      navigate("/signin");
    }
    
    getDocs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Container style={{margin:"40px auto"}}>
        <ToastContainer />
        <Row className="text-center">
          <Col>
            <h1 className="text-primary mb-4">Document List</h1>
          </Col>
        </Row>
        <Row style={{borderBottom:"3px solid black", marginBottom:"20px"}}>
          <Col md={1}><h4>Type</h4></Col>
          <Col md={2}><h4>Name</h4></Col>
          <Col md={3}><h4>Content</h4></Col>
          <Col md={2}><h4>Author</h4></Col>
          <Col md={4} className="text-center"><h4>Actions</h4></Col>
        </Row>
        <Row className="mb-4">
          {docs && docs.map((doc, index) => (
            <DocCard
              key={index}
              doc={doc}
              getDocs={getDocs}
            />
          ))}
          {(!docs || docs.length === 0) &&
          <Row>
            <Col md={12} className="text-center">
              <h3 className="text-danger">No documents</h3>
            </Col>
          </Row>
          }
        </Row>
        <Row className="text-center">
          <Col>
            <Button variant="primary" className="m-2" onClick={() => navigate('/create')} >New Document</Button>
            <Button variant="dark" className="m-2" onClick={() => navigate('/')} >Main</Button>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default DocList;
