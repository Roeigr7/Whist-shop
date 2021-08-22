import mongoose from 'mongoose';

async function db() {
  await mongoose
    .connect(
      'mongodb+srv://admin:admin@shop.xydnf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
      {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
      }
    )
    .then(() => {
      console.log(`DB connected`);
    })
    .catch((err) => console.log(err));
}

export default db;
