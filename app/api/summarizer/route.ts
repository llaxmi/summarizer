import { NextResponse } from "next/server";

export const GET = () => {
  return NextResponse.json({ message: "Hello World" });
};
export const POST = async (req: Request) => {
  const formData = await req.formData();
  const file = formData.get("file");
  console.log(file);
  return NextResponse.json({ message: "Hello World" });
};
