const http = require('http');
const fs = require('fs');
const path = require('path');

const port = 3000;

const server = http.createServer(function(req, res) {
    // Set content type based on file extension
    const contentType = {
        '.html': 'text/html',
        '.css': 'text/css',
        '.js': 'text/javascript',
        '.svg': 'image/svg+xml',
        '.png': 'image/png'
    };

    let filePath = '.' + req.url;
    if (filePath === './') {
        filePath = './main.html'; // Default file to serve
    }

    const extname = path.extname(filePath);
    const contentTypeHeader = contentType[extname] || 'application/octet-stream';

    res.setHeader('Access-Control-Allow-Origin', '*'); // Allow requests from any origin

    fs.readFile(filePath, function(error, data) {
        if (error) {
            if (error.code === 'ENOENT') {
                res.writeHead(404);
                res.end('Error: File Not Found');
            } else {
                res.writeHead(500);
                res.end('Server Error: ' + error.code);
            }
        } else {
            res.writeHead(200, { 'Content-Type': contentTypeHeader });
            res.end(data);
        }
    });
});

server.listen(port, function(error) {
    if (error) {
        console.log('Error starting server:', error);
    } else {
        console.log('Server is running on port', port);
    }
});



/*const mysql = require('mysql');
const express = require('express');
const bodyParser = require('body-parser');
const info = express();

const path = require('path'); //for path fin

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.post('/submit-form', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    console.log('Username:', username);
    console.log('Password:', password);
    // Process the form data as needed
    res.send('Form submitted successfully');
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', 
  database: 'mpic_login' 
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to database:', err);
    return;
  }
  console.log('Connected to database');
  
});

connection.query('SELECT * FROM users', (err, rows) => {
    if (err) {
      console.error('Error executing query:', err);
      return;
    }
    console.log('Data fetched:', rows);
  });


connection.end();
*/