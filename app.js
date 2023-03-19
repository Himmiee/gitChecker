const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const dotenv = require('dotenv')
const path = require('path')


dotenv.config()

const app = express();

const port = process.env.PORT || 3050;


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
// app.use(express.static(__dirname + '/public'));
app.use(express.static(path.join(__dirname, "public")));

app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname+"/public/git.html"))
})

app.listen(port, () => {
    console.log("App is listening on port " + port);
})