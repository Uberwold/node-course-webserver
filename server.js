const express = require('express');
const fs = require('fs');
const port = process.env.PORT || 3000;

var app = express();

app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;

  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) {
      console.log('unable to append to server.log')
    }
  })

  next();
});

app.get('/', (req, res) => {
  //res.send('Hello Express!');

  res.send({
    name: 'John',
    likes: [
    'computer games',
    'reading'
  ]
  });
});

app.get('/about', (req, res) => {
  res.send('About page');
});


app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Unable to handle request',
  });
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});