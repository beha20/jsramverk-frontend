import React, { useState } from "react";
import "trix/dist/trix";
import "trix/dist/trix.css";
import { TrixEditor } from "react-trix";
import "./styles.css";
import { CopyToClipboard } from "react-copy-to-clipboard";
export default function App() {
  const [text, setText] = useState("");
  const handleEditorReady = (editor) => {
    // this is a reference back to the editor if want to
    // do editing programatically
    // editor.insertString("editor is ready");
  };

  const handleChange = (html, text) => {
    console.log({ html, text });
    // html is the new html content
    // text is the new text content
    setText(text);
  };

  return (
    <>
      <div className="app-toolbar">
        <CopyToClipboard text={text} onCopy={() => console.log(text)}>
          <button>Save</button>
        </CopyToClipboard>
      </div>
      <TrixEditor
        id="trixEditor"
        // autoFocus={true}
        placeholder="Editor's placeholder"
        // uploadURL="https://domain.com/imgupload/receiving/post"
        // uploadData={{ key1: "value", key2: "value" }}
        // mergeTags={mergeTags}
        onChange={handleChange}
        onEditorReady={handleEditorReady}
      />
    </>
  );
}
