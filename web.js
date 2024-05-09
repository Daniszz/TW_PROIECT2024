const http = require('http');
const fs = require('fs');
const path = require('path');

const db = require('./db');

function runWeb() {
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
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
        res.setHeader('Access-Control-Allow-Credentials', 'true');
        /*db.handleFormSubmission(req, res, () => {
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
        });*/

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
}

module.exports = {
    runWeb
};