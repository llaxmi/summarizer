import { summarizePDF } from "@/app/libs/openai";
import { NextResponse } from "next/server";

export const GET = () => {
  return NextResponse.json({ message: "Hello World" });
};
export const POST = async (req: Request) => {
  const formData = await req.formData();
  const file = formData.get("file") as File;
  const summary = await summarizePDF(file);
  return NextResponse.json({ summary });
};
