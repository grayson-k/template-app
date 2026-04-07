import { betterAuth } from "better-auth";
import { pool } from "./db"; // Import the singleton pool you already tested

export const auth = betterAuth({
  // Just pass the existing pool here
  database: pool, 
  
  emailAndPassword: {
    enabled: true,
  },
});