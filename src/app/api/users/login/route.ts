import { Db } from "../../../../dbConfig/dbConfig";
import User from "../../../../models/usermodel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

Db();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { email, password } = reqBody;
        console.log(reqBody);
        //if user has 
        if (!email || !password) {
            return NextResponse.json(
                { message: "Please fill the login field." },
                { status: 400 }
            );
        }
        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json(
                { message: "User not found" },
                { status: 400 }
            );
        }

        const validPassword = bcryptjs.compare(password, user.password)

        if (!validPassword) {
            return NextResponse.json(
                { message: "Password is incorrect" },
                { status: 400 }
            );
        }
        console.log("hello 1")
        const token = jwt.sign(
            { id: user._id, email: user.email },
            process.env.SECRET_TOKEN!,
            { expiresIn: "7d" }
        );

        const response = NextResponse.json({
            message: "User login successfully",
            success: true,
            user: {
                _id: user._id,
                email: user.email
            }
        });

        response.cookies.set("token", token, {
            httpOnly: true,
        });

        return response;

    } catch (error) {
        return NextResponse.json({
            error: "error is post request"
        },
            {
                status: 500

            }
        );
    }

}