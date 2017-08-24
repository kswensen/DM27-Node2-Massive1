const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const massive = require('massive');
const connectionString = require('../config');

const app = express();

app.use(bodyParser.json());
app.use(cors());

massive(connectionString).then(db => {
    app.set('db', db);
    app.get('db').init.seed_file().then(res => {
        console.log(res)
    }).catch(err => {
        console.log(err)
    })
})

app.get('/api/getAllFromTest', (req, res) => {
    req.app.get('db').getAllFromTest().then(data => {
        res.status(200).send(data);
    })
})

app.post('/api/addData', (req, res) => {
    req.app.get('db').postData(req.body.name).then(posted => {
        res.status(200).send("It worked");
    })
})

app.post('/api/newUser', (req, res) => {
    let { name, age, country } = req.body;
    req.app.get('db').addUser([name, age, country]).then(user => {
        res.status(200).send("User Added");
    })
})

app.delete('/api/deleteUser', (req, res) => {
    req.app.get('db').deleteUser(req.body.name).then(deleted => {
        res.status(200).send("User Deleted");
    })
})

app.get('/api/users', (req, res) => {
    // if (req.query.name) {
    //     return req.app.get('db').getUserByName(req.query.name).then(user => {
    //         res.status(200).send(user);
    //     })
    // }
        req.app.get('db').getAllUsers().then(users => {
            if(req.query.name){
                users = users.filter(el => {
                    return el.name === req.query.name;
                })
            }
            if(req.query.age){
                users = users.filter(el => {
                    return el.age === +req.query.age;
                })
            }
            res.status(200).send(users);
        })
})


const port = 3000;
app.listen(port, console.log(`Its lit on port ${port} fam`));