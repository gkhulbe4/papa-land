import express from "express"
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import cors from "cors";
import bodyParser from "body-parser";
import multer from "multer";

const app = express();

app.use(bodyParser.json());
app.use(cors())

const SECRET = 'SECr3t';

const adminSchema = new mongoose.Schema({
    username: String,
    password: String
  });

const landSchema = new mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    // image: String,
  });

const Lands = mongoose.model('Lands', landSchema);
const Admin = mongoose.model('Admin', adminSchema);


mongoose.connect('mongodb+srv://gkhulbe:1234@cluster0.epbxibb.mongodb.net/', { useNewUrlParser: true, useUnifiedTopology: true, dbName: "lands" });

const verifyAdmin = (req , res, next) => {  // TOKEN VERIFICATION
  const token = req.headers.authorization;
  if (token) {
      next();
    } else {
      console.log("no token")
      res.status(401).json({ error: 'Unauthorized access' });
    }
  }

app.post("/addland" , verifyAdmin , async(req,res) => // ADD LAND
{
    const land = new Lands(req.body);
    await land.save();
    console.log(land.title)
    res.status(200).json({message: "Land added successfully" , landId: land.id })
})

app.get("/lands" , async(req,res) => // GET ALL LANDS
{
  const lands = await Lands.find({});
  res.json({ lands });
})

// app.post("/signup" , async (req,res) => {
//   const admin = new Admin(req.body);
//   await admin.save();
//   res.json({message: "Admin created"})
// })

app.post("/login" , async (req,res) => // LOGIN
{
  const{username , password} = req.body;
  const admin = await Admin.findOne({ username, password });
    if (admin) {
      const token = jwt.sign({ username }, SECRET, { expiresIn: '1h' });
      res.json({ message: 'Logged in successfully', token });
    } else {
      res.status(403).json({ message: 'Invalid username or password' });
    }
});

app.get("/admin/me" , verifyAdmin , async(req,res) => { 
  res.json("Authorised")
})


app.put("/lands/:landId" , verifyAdmin , async (req,res) => {
  const land = await Lands.findByIdAndUpdate(req.params.landId, req.body, { new: true });
  if (land) {
    res.json({ message: 'Land updated successfully' });
  } else {
    res.status(404).json({ message: 'Land not found' });
  }
})

app.get("/lands/:landId", verifyAdmin , async (req,res) => {
  const land = await Lands.findById(req.params.landId);
  res.json({land});
})

app.delete("/lands/:landId", verifyAdmin ,  async(req,res) => {
  const result = await Lands.findByIdAndDelete(req.params.landId);
  if(result)
  {
    res.json({message: "Land Deleted"});
  }
})



// multer middleware













app.listen(3000, () => console.log('Server running on port 3000'));
