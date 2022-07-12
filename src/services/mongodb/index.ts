import * as dotenv from "dotenv"
import mongoose, { ConnectOptions } from "mongoose"
dotenv.config()

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}
const connectDB = () => {
  return mongoose.connect(process.env.DATABASE_URL!, options as ConnectOptions, (err) => {
    if (err) {
      console.error("Connection to DB failed")
    } else {
      console.log("Connection to DB was successful")
    }
  })
}
const db = mongoose.connection
db.on("error", console.error.bind(console, "MongoDB connection failed"))

export default connectDB
