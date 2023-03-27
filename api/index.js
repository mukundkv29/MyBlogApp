const expresss = require('express');
const cors = require('cors');
const { default: mongoose } = require('mongoose');
const dotenv = require('dotenv');
const bcrypt=require('bcryptjs');

const User = require('./models/User');

const app = expresss();
const salt = bcrypt.genSaltSync(10);

dotenv.config();


app.use(cors());
app.use(expresss.json());

mongoose.connect(process.env.MONGO_URL);


app.post('/register',async (req,res)=>{
    const {username,password} = req.body;
    try{const UserDoc=await User.create({
        username,
        password:bcrypt.hashSync(password,salt)
    });
    res.json(UserDoc);}catch(E){
        res.status(400).json(E);
    }
});

app.post('/login', async (req,res)=>{
    const {username,password} = req.body;
    const UserDoc = await User.findOne({username});
    res.json(UserDoc);
})


app.listen(4000);
