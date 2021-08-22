import express from 'express';
import productsRoutes from './routes/products.js';
import ordersRoutes from './routes/orders.js';
import morgan from 'morgan';
import db from './db.js';
import cors from 'cors';

const port = 8080;
const app = express();
app.use(cors());
app.use(express.json());

////routes
app.use('/products', productsRoutes);
app.use('/orders', ordersRoutes);

app.use(morgan('dev'));

app.listen(port, () => {
  console.log('port ', port);
  db();
});
