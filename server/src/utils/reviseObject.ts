import { Revise } from "revise-sdk";
import * as dotenv from "dotenv";
dotenv.config();


const revise = new Revise({ auth: process.env.REVISE_API_KEY as string })

export default revise