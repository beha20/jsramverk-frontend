import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import DocList from "./pages/DocList";
import Main from "./pages/Main";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import NewDoc from "./pages/NewDoc";
import EditDoc from "./pages/EditDoc";
import Comment from "./pages/Comment";


function App() {
  return (
    <BrowserRouter basename={process.env.REACT_APP_BASE_NAME} className="App">
      {/* <Navbar /> need to fix */}
      <Routes >
        <Route path="/" element={<Main />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/docs" element={<DocList />} />
        <Route path="/create" element={<NewDoc />} />
        <Route path="/edit" element={<EditDoc />} />
        <Route path="/comment" element={<Comment />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
