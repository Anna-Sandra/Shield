import express from 'express';
import { getGitHubProfile } from '../controllers/github.controller';

const router = express.Router();

router.get('/:username', getGitHubProfile);

export default router;
