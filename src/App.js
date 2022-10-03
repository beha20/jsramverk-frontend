import axios from "axios";
import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import DocList from "./pages/DocList";
import Main from "./pages/Main";
import TextEditor from "./pages/TextEditor";
import UpdateDoc from "./pages/UpdateDoc";

function App() {
  const [docs, setDocs] = useState([]);
  const getDocs = async () => {
    const BASE_URL = "https://jsramverk-editor-beha20.azurewebsites.net";

    try {
      const result = await axios.get(`${BASE_URL}/doc`);

      setDocs(result.data);

    } catch (err) {
      setDocs([]);
    }
  };

  useEffect(() => {
    getDocs();
  }, []);

  return (
    <BrowserRouter className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/docs" element={<DocList docs={docs} />} />
        <Route path="/create" element={<TextEditor />} />
        <Route path="/edit" element={<UpdateDoc />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
