import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { PrismaClient } from "@prisma/client";

export async function POST(request: NextRequest) {
  try {
    const prisma = new PrismaClient();
    const reqBody = await request.json();
    const { username, email, password, firstName, lastName } = reqBody;

    const existingUser = await prisma.superAdmin.findUnique({
      where: {
        email: email,
      },
    });

    if (existingUser) {
      await prisma.$disconnect();
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const newUser = await prisma.superAdmin.create({
      data: {
        username: username,
        email: email,
        password: hashedPassword,
        firstName: firstName,
        lastName: lastName,
      },
    });

    await prisma.$disconnect();

    return NextResponse.json({
      message: "User Created Successfully",
      success: true,
      savedUser: newUser,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
