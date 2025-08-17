import express from 'express';
import userRouter from './routes/user.route';
import router from './routes/auth';
import githubRouter from './routes/github.route';
import { limiter } from './middleware/rateLimiter';


const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(limiter);


app.get("/", (req, res) => {
  res.send("shield is live");
});

app.use('/api/github', githubRouter);


app.use('/api/auth', router);      
app.use('/api/users', userRouter);



export default app;
