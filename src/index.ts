import http from "http";
import fs from "fs";
import path from "path";
import express from "express";
import bodyParser from "body-parser";
import { Request, Response } from "express";

const PORT = 3000;
const app = express();

app.use(express.json());

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

  let idCounter = 1;
  let tasks: {id: number, title: string }[] =[];

  app.post('/tasks', (req, res) => {
    const { title } = req.body;
    const task = {id: idCounter++, title },
    tasks.push(task);
    res.status(201).json(task);
  });


app.get('/tasks', (req, res) => {
  res.json(tasks);
});


app.put('/tasks/:id', (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  const task = tasks.find(t => t.id === parseInt(id));

  if (!task) return res.status(404).json({ error: 'Task not found' });

  task.title = title;
  res.json(task);
});

app.delete('/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  const taskIndex = tasks.findIndex(t => t.id === taskId);
  
  if (taskIndex === -1) {
      return res.status(404).json({ error: 'Task not found' });
  }
  
  const deletedTask = tasks.splice(taskIndex, 1);
  res.json(deletedTask[0]);
});



app.listen(PORT, ()=>{
console.log(`Server running at http://localhost:${PORT}`);
})

