import axios from "axios";
import React, { useEffect, useState } from "react";
import { TrixEditor } from "react-trix";
import "trix/dist/trix";
import "trix/dist/trix.css";
import Button from "./components/Button";
import Options from "./components/Options";
import "./styles.css";

const production = "https://jsramverk-editor-beha20.azurewebsites.net";
const BASE_URL = production;
const initialValue = { html: "", name: "" };

export default function App() {
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
      console.log(result, "RESULT fROM")
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
    // html is the new html content
    // text is the new text content
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
      <div className="app-toolbar">
        <Button onClick={postDocument}>
          {loading
            ? "Loading please wait..."
            : selectedDocument
              ? "Update"
              : "Post"}
        </Button>
      </div>
      <TrixEditor
        id="trixEditor"
        // autoFocus={true}
        placeholder="Editor's placeholder"
        onChange={handleChange}
      // onEditorReady={handleEditorReady}
      />
      <Options handleOptionsChange={handleOptionsChange} docs={docs} />
    </>
  );
}
