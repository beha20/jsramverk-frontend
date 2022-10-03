import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";


import axios from "axios";
import { Button, Col, Container, Row } from "react-bootstrap";
import { TrixEditor } from "react-trix";
import { io } from "socket.io-client";

const baseUrl = "https://jsramverk-editor-beha20.azurewebsites.net"
const socket = io.connect(baseUrl)

function setInputText(text) {
    let element = document.querySelector("trix-editor");
    element.value = "";
    element.editor.setSelectedRange([0, 0]);
    element.editor.insertHTML(text);
}

function UpdateDoc() {
    const location = useLocation();
    const navigate = useNavigate();
    const [newDoc, setNewDoc] = useState({
        _id: location.state.doc._id,
        name: location.state.doc.name,
        html: location.state.doc.html,
    });

    const handleChange = (text) => {
        setNewDoc((prev) => {
            return { ...prev, html:text}
        })
    }

    const handleUpdate = async() => {
        try{
            socket.emit('update', newDoc)
            await axios.put(`${baseUrl}/doc`, {
                html:newDoc.html,
                name: newDoc.name,
                id: newDoc._id,
              })

              alert("updated successfully");
              navigate('/')
        } catch(err){
            console.log(err, "HANDLE_UPDATE_ERROR")
        }

    }

    useEffect(() => {
        if(newDoc._id !== ""){
            socket.emit("create", newDoc._id)
        }
    },[])

    useEffect(() => {
        if(newDoc._id !== ""){
            setInputText(newDoc.html, false)
            socket.on("update", (data) => {
                setInputText(data.html, false)
            })
        }
    },[socket])
    
    return (
        <>

            <div>
                <Container className="text-center" >
                    <Row className="p-4">
                    <Col>
                    <h4>{newDoc.name.toUpperCase()}</h4>
                    </Col>
                    </Row>
                    <Row className="pb-4">
                    <TrixEditor
                        id="trixEditor"
                        placeholder="Editor's placeholder"
                        onChange={handleChange}
                        name="html"
                    />
                    </Row>
                    <Row className="p-4">
                    <div style={{textAlign:"center"}}>
                    <Button variant="dark"  style={{padding:"5px 40px"}} onClick={handleUpdate} >
                        Update
                    </Button>
                </div>
                    </Row>
                </Container>
            </div>
        </>
    );
}

export default UpdateDoc;
