// Import the functions you need from the SDKs you need
const admin = require("firebase-admin");
const serviceAccount = require("./worker.json");


// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });


const db = admin.firestore();

const getDocData = async (documentId) => {
    let docRef  = db.collection("documents").doc(documentId);
    const doc = await docRef.get();
    if(doc.exists){
        console.log("it exists");
        return doc.data().data;
    }
    console.log("created a new one");
    await docRef.set({ "data" : {} });
    return ""
}

const saveDocData = async(documentId, delta) => {
    if (documentId == null || delta == null) return;
    let docRef  = db.collection("documents").doc(documentId);
    await docRef.set({"data" : delta});
    return
}

module.exports = {getDocData, saveDocData};