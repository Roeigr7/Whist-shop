import express from 'express';
import {
  addOrder,
  getLastFiveDays,
  getTopFive,
  getUniqueTopFive,
} from '../controllers/orders.js';
const router = express.Router();

router.post('/', addOrder);
router.get('/top-five', getTopFive);
router.get('/top-unique-five', getUniqueTopFive);
router.get('/last-five-days', getLastFiveDays);
export default router;
