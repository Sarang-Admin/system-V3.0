import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const {
      staffID,
      username,
      email,
      password,
      firstName,
      lastName,
      address,
      contact,
      dob,
      joiningDate,
      bloodGroup,
      isVerified,
    } = reqBody;

    const existingTeacher = await prisma.teacher.findUnique({
      where: {
        staffID: staffID,
      },
    });
    if (existingTeacher) {
      return NextResponse.json(
        { error: "User already exist" },
        { status: 400 }
      );
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);
    await prisma.teacher.create({
      data: {
        staffID: staffID,
        username: username,
        email: email,
        password: hashedPassword,
        firstName: firstName,
        lastName: lastName,
        address: address,
        contact: contact,
        dob: dob,
        joiningDate: joiningDate,
        bloodGroup: bloodGroup,
        isVerified: isVerified,
      },
    });
    await prisma.$disconnect();

    return NextResponse.json({
      message: "Teacher Created Successfully",
      success: true,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

