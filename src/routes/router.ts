import express from 'express';
import type { Request, Response } from 'express';
import { restartService } from 'src/services/reportService';

const router = express.Router();

router.post('/restart', async (req: Request, res: Response) => {
  try {
    await restartService();
    res.status(200).send('Service restarted');
  } catch (error) {
    res.status(500).send('Failed to restart service');
  }
});

export default router;
