import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const {
      studentID,
      username,
      email,
      password,
      firstName,
      lastName,
      fatherName,
      motherName,
      address,
      contact,
      altContact,
      whContact,
      parentContact,
      city,
      pincode,
      dob,
      admissionDate,
      bloodGroup,
      lastSchool,
      isSatsangi,
      nearTemple,
      alergy,
      dieces,
      isDish,
      isBed,
      hostel,      
      standard,
    } = reqBody;

    const existingTeacher = await prisma.student.findUnique({
      where: {
        studentID: studentID,
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
    await prisma.student.create({
      data: {
        studentID: studentID,
        username: username,
        email: email,
        password: hashedPassword,
        firstName: firstName,
        lastName: lastName,
        fatherName: fatherName,
        motherName: motherName,
        address: address,
        contact: contact,
        altContact: altContact,
        whContact: whContact,
        parentContact: parentContact,
        city: city,
        pincode: pincode,
        dob: dob,
        admissionDate: admissionDate,
        bloodGroup: bloodGroup,
        lastSchool: lastSchool,
        isSatsangi: isSatsangi,
        nearTemple: nearTemple,
        alergy: alergy,
        dieces: dieces,
        isDish: isDish,
        isBed: isBed,
        hostel: hostel,
        standard:standard,
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
