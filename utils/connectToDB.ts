import mongoose from "mongoose";
import log from "./logger";

const connectToDB = async () => {
  const { MONGO_URI } = process.env;
  try {
    await mongoose.connect(MONGO_URI as string);
    log.info('Connected');
  } catch (e) { 
    log.info('Failed');
    process.exit(1);
  }
}

export default connectToDB;