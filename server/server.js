const {getDocData, saveDocData} = require("./Firebase");


const io = require("socket.io")(3001, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  socket.on("get-document", async (documentID) => {
    // retrieve document and emit it
    if (documentID == null ) return;
    
    const data = await getDocData(documentID);
    socket.join(documentID);
    socket.emit('load-document', data);
    socket.on("emit-change", (delta) => {
      socket.broadcast.to(documentID).emit("recieve-change", delta);
    });
  });

  socket.on("save-document", (data) => {
    const {documentId , delta} = data;
    if(documentId == null || delta == null) return;
    // save the document to the server
    console.log("writing to firestore")
    saveDocData(documentId, delta);
  })

});

