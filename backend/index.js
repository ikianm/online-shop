import express from "express";
import monk from "monk";
import cors from "cors";

const JWT_SECRET = "meow"; 

const app = express();

app.use(express.json());
app.use(cors());

const db = monk('mongodb+srv://ikianm:Kian12114000@cluster0.165het5.mongodb.net/main_db');

const usersCollection = db.get("users"); // name, email, password, role
const productsCollection = db.get("products"); // name, price, category, count, image, description


// auth routes
app.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await usersCollection.findOne({ email });
    if (!user || user.password != password) res.sendStatus(400);
    else {
      res.json({
        name: user.name,
        role: user.role,
        email,
        id: user.id,
      });
    }
  } catch (error) {
    console.log(error.message);
    res.sendStatus(500);
  }
});
app.post("/signup", async (req, res) => {
  try {
    const { email, password, name } = req.body;
    if (!email || !password || !name) return res.sendStatus(400);
    const usersCount = await usersCollection.count();
    const userexists = await usersCollection.findOne({ email });
    if (userexists) return res.sendStatus(400);
    const role = usersCount > 0 ? "user" : "admin";
    const user = await usersCollection.insert({
      email,
      password,
      name,
      role,
    });
    res.status(201);
    res.json({ name, email, role, id: user._id});
  } catch (error) {
    console.log(error.message);
    res.sendStatus(500);
  }
});

// users' routes
app.get("/users", async (req, res) => {
  const users = await usersCollection.find({});
  res.json(users);
});

app.delete("/users/:id", async (req, res) => {
  await usersCollection.findOneAndDelete({ _id: req.params.id });
  res.sendStatus(200);
});

// products's routes
app.get("/products", async (req, res) => {
  const products = await productsCollection.find({});
  res.json(products);
});
app.get("/products/:id", async (req, res) => {
  const product = await productsCollection.findOne({ id: req.params.id });
  res.json(product);
});
app.post("/products", async (req, res) => {
  const { name, price, category, count, image, description } = req.body;
  const product = await productsCollection.insert({ name, price, category, count, image, description });
  res.statusCode = 201;
  res.json(product);
});
app.delete("/products/:id", async (req, res) => {
  await productsCollection.findOneAndDelete({ _id: req.params.id });
  res.sendStatus(200);
});

app.listen(8080, () => {
  console.log(`Example app listening on port 8080`);
});
