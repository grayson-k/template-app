import { pool } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // 1. Run the query
    const res = await pool.query("SELECT NOW()");
    
    // 2. Return the result as JSON
    return NextResponse.json({ 
      success: true, 
      message: "Successfully connected to Neon!",
      timestamp: res.rows[0].now 
    });
  } catch (error: any) {
    // 3. Catch errors (like wrong password or SSL issues)
    console.error("DB Connection Error:", error);
    return NextResponse.json({ 
      success: false, 
      error: error.message 
    }, { status: 500 });
  }
}