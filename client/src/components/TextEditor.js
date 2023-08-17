import React, { useCallback, useEffect, useState } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import { useSocket } from "../context/socketContext";
import { useParams } from "react-router-dom";

const TOOLBAR_OPTIONS = [
  ["bold", "italic", "underline", "strike"], // toggled buttons
  ["blockquote", "code-block"],
  [{ align: [] }],

  [{ header: [1, 2, 3, 4, false] }], // custom button values
  [{ list: "ordered" }, { list: "bullet" }],
  [{ script: "sub" }, { script: "super" }], // superscript/subscript
  [{ indent: "-1" }, { indent: "+1" }], // outdent/indent

  [{ size: ["small", false, "large", "huge"] }], // custom dropdown

  [{ color: [] }, { background: [] }], // dropdown with defaults from theme
  [{ font: [] }],

  ["clean"],
];

export default function TextEditor() {
  const { id: documentID } = useParams();
  const [quill, setQuill] = useState();
  const [dataChange, setDataChange] = useState(true);
  const { socket } = useSocket();

//   useEffect to save the document.
useEffect(() => {
    if (quill == null) return
    const saveData = setTimeout(() => {
        const delta = quill.getContents();
        socket.emit('save-document', {"documentId" : documentID, "delta" : delta})
    }, 2000)

    return () => clearTimeout(saveData);
}, [dataChange , documentID, quill, socket])

  // useEffect to load the document
  useEffect(() => {
    if (socket == null || quill == null) return;

    socket.once("load-document", (document) => {
      quill.setContents(document);
      quill.enable();
    });
    socket.emit("get-document", documentID);
  }, [socket, quill, documentID]);

  // useEffect to transmit changes made in the doc
  useEffect(() => {
    if (socket == null || quill == null) return;

    const handler = (delta, oldDelta, source) => {
      if (source !== "user") return;
      socket.emit("emit-change", delta);
      setDataChange((prev) => !prev);
    };

    quill.on("text-change", handler);

    return () => {
      quill.off("text-change", handler);
    };
  }, [socket, quill]);

  // useEffect to recieve changes made in the doc
  useEffect(() => {
    if (socket == null || quill == null) return;

    const handler = (delta) => {
      quill.updateContents(delta);
    };

    socket.on("recieve-change", handler);

    return () => {
      socket.off("recieve-change", handler);
    };
  }, [socket, quill]);

  const wrapperRef = useCallback((wrapper) => {
    if (wrapper == null) return;
    wrapper.innerHTML = "";
    const editor = document.createElement("div");
    wrapper.append(editor);

    const q = new Quill(editor, {
      theme: "snow",
      modules: {
        toolbar: TOOLBAR_OPTIONS,
      },
    });
    q.enable(false);
    q.setText("Loading...");
    setQuill(q);
  }, []);

  return <div className="container" ref={wrapperRef}></div>;
}
