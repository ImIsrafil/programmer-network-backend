const express = require('express');
require('dotenv').config();
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.vxgm6kf.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });



async function server() {
    try {
        await client.connect();
        const database = client.db('programmer_network');
        const usersCollection = database.collection('users');

        app.post('/user/login/adduser', async (req, res) => {
            const user = req.body;
            const query = {uid: user.uid};
            let result = undefined;
            result = await usersCollection.findOne(query);
            if (result) {
                //IF USER EXIST
            } else {
                // IF USER NOT EXIST
                const result =  await usersCollection.insertOne(user);
                res.send(result);
            }
        });

        // GET ALL USERS INFORMATIONS API
        app.get('/programmerNetwork/users', async (req, res) => {
            const cursor = usersCollection.find({});
            const users = await cursor.toArray();
            res.send(users);
        });
        

    } finally {

    }
}

server().catch(err => console.dir());


app.get('/', (req, res) => {
    res.send('RUNNING NODE EXPRESS SERVER OF PROGRAMMER_NETWORK');
});

app.listen(port, () => {
    console.log('Listening on PORT:', port);
});


// USERNAME = programmerNet
// PASSWORD = QeexiNOBshcuemG6