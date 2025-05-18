import http from "http";
import fs from "fs";
import path from "path";

const PORT = 3000;

const server = http.createServer((req, res) => {
    if (req.url === '/') {
        const filePath = path.join(__dirname, 'index.html');
        
        fs.readFile(filePath, (err, content) => {
          if (err) {
            res.writeHead(500);
            res.end('Error loading HTML file');
          } else {
            //res.writeHead(200, { 'Content-Type': 'text/html' });

            res.writeHead(200);
            res.end(content);
          }
        });
    }else if (req.url === '/style.css'){
        const cssPath =path.join(__dirname, 'style.css');

        fs.readFile(cssPath, (err, content) => {
            if (err) {
              res.writeHead(500);
              res.end('Error loading CSS');
            } else {
              //res.writeHead(200, { 'Content-Type': 'text/css' });

              res.writeHead(200);
              res.end(content);     
        }
    });
    } else if (req.url === '/index.jpg') {
        const imgPath = path.join(__dirname, 'index.jpg');
        fs.readFile(imgPath, (err, content) => {
            if (err) {
              res.writeHead(500);
              res.end('Error loading image');
            } else {
              //res.writeHead(200, { 'Content-Type': 'image/jpeg' });

              res.writeHead(200);
              res.end(content);
      }
    });
      } else {
        res.writeHead(404);
        res.end('Page not found');
      } 
  });

server.listen(PORT, ()=>{
console.log(`Server running at http://localhost:${PORT}`);
})

