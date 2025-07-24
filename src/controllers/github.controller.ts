import { Request, Response } from 'express';
import axios from 'axios';
import {logger} from '../Utils/logger';

export const getGitHubProfile = async (req: Request, res: Response) => {
  const { username } = req.params;

  try {
    const response = await axios.get(`https://api.github.com/users/${username}`);
    const { login, name, avatar_url, bio, public_repos, followers, following, html_url } = response.data;

    logger.info(`Fetched GitHub profile for: ${username}`);

    res.json({
      username: login,
      name,
      avatar: avatar_url,
      bio,
      public_repos,
      followers,
      following,
      profile: html_url
    });
  } catch (error) {
    logger.error(`GitHub user not found: ${username}`);
    res.status(404).json({ message: 'GitHub user not found' });
  }
};
