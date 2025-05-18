import http from "http";
import fs from "fs";
import path from "path";

const PORT = 3000;

const server = http.createServer((req, res) => {
    res.statusCode = 200;
      res.end('Hello, World!\n'); 
  });

server.listen(PORT, ()=>{
console.log(`Server running at http://localhost:${PORT}`);
})

