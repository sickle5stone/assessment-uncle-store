const path = require("path");
const cors = require("cors");
const express = require("express");

var admin = require("firebase-admin");
var serviceAccount = require("./access.json");

const { Firestore } = require("@google-cloud/firestore");
// Imports the Google Cloud client library.
const { Storage } = require("@google-cloud/storage");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const firestore = new Firestore();
const itemsDatabase = firestore.collection("items");

// setup express
const app = express();
app.use(express.json());
app.use(cors());

app.get("/listItems", async function (req, res) {
  let listOfItems = [];

  const documents = await itemsDatabase.get().then((querySnapshot) => {
    querySnapshot.forEach(async (item) => {
      listOfItems.push({ id: item.id, ...item.data() });
    });
  });

  res.json(listOfItems);
});

app.post("/addItem", async function (req, res) {
  const item = req.body;

  itemsDatabase.add(item).then((docReference) => {
    console.log(`${docReference.id} created`);
    res.json({ id: docReference.id, ...item });
  });
});

app.delete("/deleteItem", async function (req, res) {
  const item = req.body;
  const id = item.itemToDelete.id;

  itemsDatabase
    .doc(id)
    .delete()
    .then(() => {
      res.json({ id, name: item.itemToDelete.name });
    });
});

app.post("/updateItem", async function (req, res) {
  const item = req.body;

  const updateItemRef = itemsDatabase.doc(item.id);
  updateItemRef.set({ ...item }, { merge: true });

  res.json({ id: item.id, ...item });
});

// Start express @ port 3001
app.listen(3001);
console.log("Listening on port 3001");
