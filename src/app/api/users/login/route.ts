import {Db} from "../../../../dbConfig/dbConfig";
import {User} from "../../../../models/usermodel";
import { NextRequest , NextResponse } from "next/server";
import bcrypt from "bcryptjs";



Db();

export async function POST(resquest:NextRequest) {
    try {
        const reqBody = await resquest.json();
        const {username , email , password} = reqBody
        console.log(reqBody);
        //if user has 

        
    } catch (error) {
        return NextResponse.json({error:"error is post request"},{status:500});
        
    }
    
}