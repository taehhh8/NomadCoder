import { NextResponse } from "next/server";
import { scrypt, randomBytes } from "crypto";
import { promisify } from "util";
import prisma from "@/lib/db";
import { userSchema } from "@/lib/validation";
const scryptAsync = promisify(scrypt);
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validation = userSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json({ error: validation.error.errors[0].message }, { status: 400 });
    }
    const { username, email, password } = body; // email 추가
    // Check for existing user
    const existingUser = await prisma.user.findUnique({
      where: { username },
    });
    if (existingUser) {
      return NextResponse.json({ error: "Username already exists" }, { status: 400 });
    }
    // Hash password
    const salt = randomBytes(16).toString("hex");
    const hash = (await scryptAsync(password, salt, 64)) as Buffer;
    const hashedPassword = `${hash.toString("hex")}.${salt}`;
    // Create user with all required fields
    const user = await prisma.user.create({
      data: {
        username,
        email, // email 필드 추가
        password: hashedPassword,
        createdAt: new Date(), // createdAt 필드 추가
        updatedAt: new Date(), // updatedAt 필드 추가
      },
    });
    return NextResponse.json({ message: "Account created successfully" }, { status: 201 });
  } catch (error) {
    console.error("Create account error:", error);
    return NextResponse.json({ error: "An error occurred while creating your account" }, { status: 500 });
  }
}
