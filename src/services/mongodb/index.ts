import mongoose, { ConnectOptions } from "mongoose"
import { BASE_URL } from "../../config"

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  keepAlive: true,
}

const dbconnnection = async () => {
  await mongoose
    .connect(BASE_URL, options as ConnectOptions)
    .then(() => {
      console.log(`Connected to Mongo!`)
    })
    .catch((err) => console.log(err))
  return mongoose
}

export default dbconnnection
