import mongoose from "mongoose";
import log from "./logger";

const connectToDB = async () => {
  const { MONGO_URI, MONGO_USERNAME, MONGO_PASSWORD } = process.env;
  
  try {
    await mongoose.connect(MONGO_URI as string);
    log.info('Connected to DB');
  } catch (e) { 
    log.info('Connection Failed');
    process.exit(1);
  }
}

export default connectToDB;