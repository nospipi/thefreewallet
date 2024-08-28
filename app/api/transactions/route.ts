import { auth } from "@/auth"
import { NextResponse } from "next/server"
import connectDB from "../../../db.connect"

//------------------------------------------------------------------------------

export const GET = async () => {
  const session = await auth()
  await connectDB()

  return NextResponse.json({
    ...session,
  })
}
