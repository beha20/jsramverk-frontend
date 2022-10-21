import React from "react";
import parse from "html-react-parser";
import { Button, Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import useCurrentUser from "../hooks/useCurrentUser";
import useDocuments from "../hooks/useDocuments";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { downloadPDFByDoc } from "../utils";

const DocCard = ({ doc, getDocs }) => {
  const navigate = useNavigate();
  const currentUser = useCurrentUser();
  const { deleteDocument } = useDocuments(currentUser?.accessToken);

  const deleteDoc = async (id) => {
    const {data, isError, error} = await deleteDocument(id);
    if (!isError) {
      toast.success(data.message, {
        position: "top-right",
        theme: "dark"
      });
      await getDocs();
    } else {
      toast.error(error.message, {
        position: "top-right",
        theme: "dark"
      });
    }
  }

  const editDoc = () => {
    navigate("/edit", {
      replace: true,
      state: {
        doc: doc
      },
    });
  };

  const comment = () => {
    navigate("/comment", {
      replace: true,
      state: {
        doc: doc
      },
    });
  }

  const handleDownloadPDF = async (doc) => {
    if (!await downloadPDFByDoc(doc)) {
      toast.error("Can't download as PDF! Document content is empty.", {
        position: "top-right",
        theme: "dark"
      });
      return;
    }
    toast.success("Downloaded your document as PDF successfully!", {
      position: "top-right",
      theme: "dark"
    });
  }
  
  return (
    <Row className="p-1">
      <ToastContainer />
      {doc &&
      <>
      <Col md={1} className="p-1">
        <h6>{doc.type}</h6>
      </Col>
      <Col md={2} className="p-1">
        <h6>{doc.name}</h6>
      </Col>
      <Col md={3} className="p-1">
        {/* {parse(doc.html)} */}
        {doc.html.replace(/(<([^>]+)>)/gi, "").substring(0, 150) + "..."}
      </Col>
      <Col md={2} className="p-1">
        {parse(doc.author)}
      </Col>
      <Col md={4} className="p-1 d-flex align-items-start justify-content-end">
        <Button className="m-2" variant="dark" onClick={editDoc} disabled={!currentUser || currentUser.email !== doc.author ? true : false}>Edit</Button>
        <Button className="m-2" variant="danger" onClick={() => deleteDoc(doc._id)} disabled={!currentUser || currentUser.email !== doc.author ? true : false}>Delete</Button>
        <Button className="m-2" variant="primary" onClick={() => handleDownloadPDF(doc)} disabled={!currentUser || currentUser.email !== doc.author ? true : false}>PDF</Button>
        <Button className="m-2" variant="success" onClick={comment}>Comment</Button>
      </Col>
      </>}
    </Row>
  );
}

export default DocCard;
