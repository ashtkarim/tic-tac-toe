import mongoose from "mongoose";

mongoose.connect('mongodb://localhost:27017/tic-tac-toe').then(() => {
  console.log('db is connected');
}).catch(() => {
  console.log('couldn\'t connect');
});

export default mongoose;