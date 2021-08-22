import express from 'express';
import {
  addProduct,
  deleteProduct,
  getProducts,
  updateProduct,
} from '../controllers/products.js';
const router = express.Router();

router.post('/', addProduct);
router.get('/', getProducts);
router.patch('/:id', updateProduct);
router.delete('/:id', deleteProduct);

export default router;
