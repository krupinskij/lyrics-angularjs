const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.sendFile('index.html' , { root : __dirname})
})

app.listen(4000, function(){
  console.log('app started on port 4000');
});