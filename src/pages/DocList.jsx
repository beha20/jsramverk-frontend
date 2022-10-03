import { Col, Container, Row } from "react-bootstrap";
import DocCard from "../components/DocCard";

function DocList({ docs }) {
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
        </Container>);
    } else {
        return <p>No documents are in the database</p>;
    }
}

export default DocList;
