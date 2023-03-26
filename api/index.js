const expresss = require('express');
const cors = require('cors');
const { default: mongoose } = require('mongoose');
const User = require('./models/User');
const app = expresss();
const dotenv = require('dotenv');

dotenv.config();


app.use(cors());
app.use(expresss.json());

mongoose.connect(process.env.MONGO_URL);

app.post('/register',async (req,res)=>{
    const {username,password} = req.body;
    const UserDoc=await User.create({username,password});
    res.json(UserDoc);
});


app.listen(4000);
