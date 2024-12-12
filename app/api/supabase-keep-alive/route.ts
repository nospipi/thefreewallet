import { supabaseKeepAliveOperation } from "@/lib/serverActionsDbDriver";

//---------------------------------------------------------

export const dynamic = "force-dynamic";
export async function GET() {
  try {
    await supabaseKeepAliveOperation();
    console.log("Supabase keep-alive operation successful");
    return Response.json({
      message: "Supabase keep-alive operation successful",
    });
  } catch (error) {
    const message = (error as Error).message ?? "An error occurred";
    console.error(message);
    return Response.json({ error: message }, { status: 400 });
  }
}
