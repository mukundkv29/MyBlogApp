const expresss = require('express');
const cors = require('cors');
const { default: mongoose } = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParse = require('cookie-parser');

const User = require('./models/User');

const app = expresss();


const salt = bcrypt.genSaltSync(10);
const secret = 'In8nfaH7hWW44f5g7944nlfksa';


dotenv.config();


app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use(expresss.json());
app.use(cookieParse());

 
mongoose.connect(process.env.MONGO_URL);


app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    try {
        const UserDoc = await User.create({
            username,
            password: bcrypt.hashSync(password, salt)
        });
        res.json(UserDoc);
    } catch (E) {
        res.status(400).json(E);
    }
});

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const UserDoc = await User.findOne({ username });
    if (!UserDoc) {
        res.status(400).json('Invalid Username....');
    } else {
        const isValidUser = bcrypt.compareSync(password, UserDoc.password);
        if (isValidUser) {
            //logged in 
            jwt.sign({ username, id: UserDoc._id }, secret, {}, (err, token) => {
                if (err) throw err;
                res.cookie('token', token).json('Successful Login...');
            });
        } else {
            res.status(400).json('invalid user Password...');
        }
    }
});


app.get('/profile',(req,res)=>{
    const {token} = req.cookies;
    jwt.verify(token,secret,{},(err,info)=>{
        if(err) throw err;
        res.json(info);
    });
    
})


app.listen(4000);

// "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InZhcnVuIiwiaWQiOiI2NDIxNzkwYTBmN2JkMTg3N2Q1Yjg4ZTEiLCJpYXQiOjE2Nzk5MzQzMTB9.VSc_QVO6VTv6Tj_ZXaL287uML4NSP4PqTqu3-mmck_Q"