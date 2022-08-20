import dotenv from "dotenv";

dotenv.config();

export const publicKey = process.env.PUBLIC_KEY as string;
