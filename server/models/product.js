import mongoose from 'mongoose';

const ProductSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      maxLength: [20, 'maximum 20 letters'],
    },
    price: {
      type: Number,
      required: true,
      min: [1, 'at least 1$'],
      max: [1000000, 'maximum 1,000,000$'],
    },
    desc: {
      type: String,
      required: true,
      maxLength: [50, 'maximum 50 letters'],
    },
    image: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Product = mongoose.model('Product', ProductSchema);

export default Product;
