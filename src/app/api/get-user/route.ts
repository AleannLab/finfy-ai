import { getUser } from "@/auth/server";

export async function GET(req: Request) {
  const user = await getUser();
  console.log("useruser", user)
  return Response.json(user);
}
