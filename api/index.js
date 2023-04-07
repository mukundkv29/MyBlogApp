const express = require('express');
const cors = require('cors');
const { default: mongoose } = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParse = require('cookie-parser');
const multer = require('multer');
const fs = require('fs');
const Post = require('./models/post');


const uploadMiddleWare = multer({ dest: 'uploads/' });

const User = require('./models/User');

const app = express();


const salt = bcrypt.genSaltSync(10);
const secret = 'In8nfaH7hWW44f5g7944nlfksa';


dotenv.config();


app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use(express.json());
app.use(cookieParse());
app.use('/uploads', express.static(__dirname + '/uploads'));


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
                // res.cookie('token', token).json('Successful Login...');
                res.cookie('token', token).json({
                    id: UserDoc._id,
                    username,
                });
            });
        } else {
            res.status(400).json('invalid user Password...');
        }
    }
});


app.get('/profile', (req, res) => {
    const { token } = req.cookies;
    jwt.verify(token, secret, {}, (err, info) => {
        if (err) throw err;
        res.json(info);
    });

})


app.post('/logout', (req, res) => {
    res.cookie('token', '').json('ok');
})


app.post('/post', uploadMiddleWare.single('file'), async (req, res) => {


    const { originalname, path } = req.file;
    const parts = originalname.split('.');
    const ext = parts[parts.length - 1];
    const newPath = path + '.' + ext;
    fs.renameSync(path, newPath);

    const { token } = req.cookies;
    jwt.verify(token, secret, {}, async (err, info) => {
        if (err) throw err;
        const { title, summary, content } = req.body;

        const PostDoc = await Post.create({
            title, summary, content,
            cover: newPath,
            author: info.id,
        });
        // res.json(info);
        res.json(PostDoc);
    });



})



app.get('/post', async (req, res) => {
    // const posts =await Post.find();
    // res.json(posts.populate('author'));
    res.json(await Post.find()
        .populate('author', ['username'])
        .sort({ createdAt: -1 })
        .limit(15)
    );
});

app.put('/post', uploadMiddleWare.single('file'), async (req, res) => {
    let newPath = null;
    if (req.file) {
        const { originalname, path } = req.file;
        const parts = originalname.split('.');
        const ext = parts[parts.length - 1];
        newPath = path + '.' + ext;
        fs.renameSync(path, newPath);
    }

    const { token } = req.cookies;
    jwt.verify(token, secret, {}, async (err, info) => {
        if (err) throw err;
        const { id, title, summary, content } = req.body;
        const postDoc = await Post.findById(id);


        const isAuthor = JSON.stringify(postDoc.author) === JSON.stringify(info.id);
        // res.json({isAuthor,postDoc,info});
        if (!isAuthor) {
            return res.status(400).json('You are not allowed to Edit this Post');
        }
        await postDoc.updateOne({
            title,
            summary,
            content,
            cover: newPath ? newPath : postDoc.cover,
        });

        res.json(postDoc);
    });

});

app.get('/post/:id', async (req, res) => {
    // res.json(req);->error

    const { id } = req.params;
    const PostDoc = await Post.findById(id).populate('author', ['username']);
    res.json(PostDoc);
    // res.json(req.params);
});


app.listen(4000);
