import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import { TrixEditor } from "react-trix";
import "trix/dist/trix";
import "trix/dist/trix.css";
import Options from "../components/Options";



const BASE_URL = "https://jsramverk-editor-beha20.azurewebsites.net";
const initialValue = { html: "", name: "" };

export default function TextEditor() {
  const [value, setValue] = useState(initialValue);
  const [docs, setDocs] = useState([]);
  const [change, setChange] = useState(true);
  const [loading, setLoading] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState(false);

  const getDocs = async () => {
    setLoading(true);
    try {
      const result = await axios.get(`${BASE_URL}/doc`);

      setDocs(result.data);

    } catch (err) {
      setDocs([]);
    } finally {
      setLoading(false);
    }
  };
  const postDocument = async () => {
    const { html, name } = value;
    if (loading) return;
    if (!name) return alert("Please enter some text");
    setLoading(true);
    try {
      let result;
      if (!selectedDocument) {
        result = await axios.post(`${BASE_URL}/doc`, {
          html,
          name,
        });
        alert("post successfully");
      } else {
        result = await axios.put(`${BASE_URL}/doc`, {
          html,
          name,
          id: selectedDocument._id,
        });
        alert("updated successfully");
        setSelectedDocument(false);
      }
      setChange((prev) => !prev);
      setDocs(result.data);
      setValue(initialValue);
    } catch (err) {
      setDocs([]);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (html, text) => {
    setValue({ html, name: text });
  };
  useEffect(() => {
    getDocs();
  }, [change]);

  const handleOptionsChange = (e) => {
    if (e.target.value === "none") return setSelectedDocument(false);
    const document = docs.find((doc) => doc._id === e.target.value);
    setValue({ html: document.html, name: document.name });
    setSelectedDocument(document);
  };

  return (
    <>
      <Container style={{ padding: "40px 0" }}>

        <TrixEditor
          id="trixEditor"
          placeholder="Editor's placeholder"
          onChange={handleChange}
        />
        <div style={{ padding: "40px" }}>
          <Options handleOptionsChange={handleOptionsChange} docs={docs} />

        </div >
        <div style={{ textAlign: "center", margin: "40px" }}>
          <Button variant="dark" style={{ padding: "5px 40px" }} onClick={postDocument}>
            {loading
              ? "Loading please wait..."
              : selectedDocument
                ? "Update"
                : "Post"}
          </Button>
        </div>
      </Container>
    </>
  );
}
