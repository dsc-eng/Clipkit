import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/db";
import User from "@/models/user";
// import { request } from "http";

export async function POST(request: NextRequest) {
    try {
        const {email,password} = await request.json()

        if(!email || !password){
            return NextResponse.json(
                {error:"Missing required fields"}, {status:400}
            ); 
        }

        await dbConnect()

        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return NextResponse.json(
                {error:"User already exists"}, {status:400}
            );
        }

        await User.create({
            email,password
        });

        return NextResponse.json(
                {message:"User registered successfully "}, {status:400}
            );


    } catch (error) {
        console.error("Registration error:", error);
        return NextResponse.json(
            {error:"Failed to register user."}
        );
    }
}