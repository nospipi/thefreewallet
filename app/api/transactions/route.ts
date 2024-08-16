import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"
import { authOptions } from "../auth/[...nextauth]/route"
import connectDB from "../../../db.connect"

//------------------------------------------------------------------------------

export const GET = async () => {
  const session = await getServerSession(authOptions)
  await connectDB()

  return NextResponse.json({
    ...session,
  })
}
