import mongoose from 'mongoose';

const CartSchema = new mongoose.Schema({
  title: String,
  price: Number,
  quantity: Number,
});
const OrderSchema = mongoose.Schema(
  {
    order: [CartSchema],
    required: false,

    total: {
      type: Number,
      required: false,
    },
  },
  { timestamps: true }
);

const Order = mongoose.model('Order', OrderSchema);

export default Order;
