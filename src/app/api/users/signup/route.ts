import { Db } from "../../../../dbConfig/dbConfig";
import User from "../../../../models/usermodel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";


Db();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { username, email, password } = reqBody
        console.log(reqBody);
        // if the user field is empty 
        if (!username || !email || !password) {
            return NextResponse.json({ message: "please fill the required field." }, { status: 400 })
        }
        //if user has already exist..
        const user = await User.findOne({ email })
        if (user) {
            return NextResponse.json({ message: "user is already exist." }, { status: 400 })
        }
        const salt = await bcryptjs.genSalt(10);
        const hashPassword = await bcryptjs.hash(password, salt)

        const newUser = new User({
            username,
            email,
            Password: hashPassword
        })
        // Fix the success response
        const save = await newUser.save();
        console.log(save);

        return NextResponse.json({
            message: "User created successfully",
            newUser,
            success: true,
        });

    } catch (error) {
        return NextResponse.json({ error: "error is post request" }, { status: 500 });

    }

}