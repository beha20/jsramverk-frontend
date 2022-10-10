import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
// import Navbar from "./components/Navbar";
import DocList from "./pages/DocList";
import Main from "./pages/Main";
import Login from "./pages/Login";
import Register from "./pages/Register";
import TextEditor from "./pages/TextEditor";
import UpdateDoc from "./pages/UpdateDoc";
import useCurrentUser from "./hooks/useCurrentUser";

function App() {
  const [docs, setDocs] = useState([]);
  const currentUser = useCurrentUser();
  
  const getDocs = async () => {
    const BASE_URL = process.env.REACT_APP_BASE_URL;
    
    try {
      const result = await axios.get(`${BASE_URL}/doc`, {
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': currentUser.accessToken
        }
      });

      setDocs(result.data);

    } catch (err) {
      setDocs([]);
    }
  };

  useEffect(() => {
    getDocs();
  }, []);

  return (
    <BrowserRouter basename={process.env.REACT_APP_BASE_NAME} className="App">
      {/* <Navbar /> need to fix */}
      <Routes >
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/docs" element={<DocList docs={docs} />} />
        <Route path="/create" element={<TextEditor />} />
        <Route path="/edit" element={<UpdateDoc />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
