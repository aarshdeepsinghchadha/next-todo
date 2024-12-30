import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: Request) {
    if(req.method !== "POST") {
        return res.status(405).json({message:"Method not allowed."});
    }

    try {
        const { name, email, password } = await req.json();

        console.log("req", req.json);
        console.log("name", name);
        console.log("email", email);
        console.log("password", password);

        if (!name || !email || !password) {
            return NextResponse.json(
                {message: "Name, Email and password are required."},
                {status: 400}
            )
        }

        const existingUser = await prisma.user.findUnique({where: {email}});
        if(existingUser) {
            return NextResponse.json(
                {message:"User already exist!"},
                {status: 400}
            )
        }

        const hashPassword = await bcrypt.hash(password, 10);

        const newUser = await prisma.user.create({
            data:{
                name: name, 
                email: email,
                password: hashPassword
            }
        });

        return NextResponse.json(
            {message: "User created Successfully"},
            {status: 201},
            {user: newUser}
        );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}