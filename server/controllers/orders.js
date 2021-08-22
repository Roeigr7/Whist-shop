import Order from '../models/order.js';

//////ADD ORDER
export const addOrder = (req, res, next) => {
  const order = new Order({ order: req.body.order, total: req.body.total });
  order.save((err, order) => {
    if (err) return res.status(500).json({ error: err });
    res.json(order);
  });
};

//top 5 sold products
export const getTopFive = async (req, res, next) => {
  try {
    const topFive = await Order.aggregate([
      {
        $unwind: '$order',
      },
      {
        $group: {
          _id: '$order.title',
          topSales: {
            $sum: '$order.quantity',
          },
        },
      },
      {
        $sort: {
          topSales: -1,
        },
      },
      {
        $limit: 5,
      },
    ]);
    res.json(topFive);
  } catch (err) {
    if (err) return res.status(500).json({ error: err });
  }
};

//top 5 UNIQUE products
export const getUniqueTopFive = async (req, res, next) => {
  try {
    const topFive = await Order.aggregate([
      {
        $unwind: '$order',
      },
      {
        $group: {
          _id: '$order.title',
          topSales: {
            $sum: 1,
          },
        },
      },

      {
        $sort: {
          topSales: -1,
        },
      },
      {
        $limit: 5,
      },
    ]);
    res.json(topFive);
  } catch (err) {
    if (err) return res.status(500).json({ error: err });
  }
};

//last 5 days
export const getLastFiveDays = async (req, res, next) => {
  let fiveDaysAgo = new Date();
  fiveDaysAgo.setDate(fiveDaysAgo.getDate() - 5);
  try {
    const topFive = await Order.aggregate([
      {
        $match: {
          createdAt: {
            $gte: fiveDaysAgo,
          },
        },
      },
      {
        $project: {
          createdAt: '$createdAt',
          total: '$total',
          date: {
            $dateToString: {
              date: '$createdAt',
              format: '%d/%m/%Y',
            },
          },
        },
      },
      {
        $group: {
          _id: '$date',
          totalSales: {
            $sum: '$total',
          },
        },
      },
      {
        $sort: {
          _id: -1,
        },
      },
    ]);
    res.json(topFive);
  } catch (err) {
    if (err) return res.status(500).json({ error: err });
  }
};
