import mongoose from "mongoose";
import 'dotenv/config'

mongoose.connect(`mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.p4v1m.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`).then(() => {
  console.log('db is connected');
}).catch(() => {
  console.log('couldn\'t connect');
});

export default mongoose;