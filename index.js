const express = require('express');
const config = require('./config');

const app = express();
app.use(express.static('src'));
app.use(express.static('node_modules'));

app.get('/*', (req, res) => {
  res.sendFile('index.html' , { root : __dirname})
})

app.listen(config.PORT, function(){
  console.log(`App started on port ${config.PORT}`);
});