import express from 'express';
import userRouter from './routes/user.route';
import router from './routes/auth';


const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("shield is live");
});

app.use('/api/auth', router);      
app.use('/api/users', userRouter);


export default app;
