import Product from '../models/product.js';
//////ADD PRODUCT
export const addProduct = (req, res, next) => {
  const { title, price, desc, image } = req.body;
  const product = new Product({
    title,
    price,
    desc,
    image,
  });
  product.save((err, product) => {
    if (err) return res.status(500).json({ error: err });
    res.json(product);
  });
};
////////DELETE PRODUCT
export const deleteProduct = (req, res, next) => {
  Product.findByIdAndRemove(req.params.id).exec((err, prod) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'deleted successfuly' });
  });
};

///UPDATE PRODUCT
export const updateProduct = (req, res, next) => {
  const updateFields = req.body;
  Product.findByIdAndUpdate(req.params.id, updateFields, {
    new: true,
  }).exec((err, prod) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'updated successfuly' });
  });
};

/////GET ALL PRODUCTS
export const getProducts = (req, res, next) => {
  Product.find()
    .sort({ updatedAt: -1 })
    .exec((err, prodList) => {
      if (err) return res.status(500).json({ error: 'ee' });
      res.json(prodList);
    });
};
