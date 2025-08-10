import { Request, Response } from 'express';
import redisClient from "../config/redis";
import Task from "../model/task.model";

export const getAllTasks = async (req: Request, res: Response) => {
  const cacheKey = 'all_tasks';

  try {
    const cachedTasks = await redisClient.get(cacheKey);

    if (cachedTasks) {
      console.log('Serving from cache');
      res.json(JSON.parse(cachedTasks));
    return;
    }

    const tasks = await Task.find();
    await redisClient.set(cacheKey, JSON.stringify(tasks), { EX: 60 }); // expires in 60s

    console.log('Serving from DB');
    res.json(tasks);
    return; 

  } catch (err) {
    console.error('Redis or DB error:', err);
    res.status(500).json({ message: 'Server error' });
    return ;
  }
};