import { Db } from "@/dbConfig/dbConfig";
import { GetDataFromToken } from "@/helpers/getDataFromToken";
import  User from "@/models/usermodel";
import { NextRequest , NextResponse } from "next/server";


Db();

export async function GET(request:NextRequest) {
    try {
        const userId = await GetDataFromToken(request);
        const user = await User.findById(userId).select("-password");
        return NextResponse.json({message : "User Found" , data : user})
        
    } catch (error:any) {
        return NextResponse.json({error:error.message},{status:400})
        
    }  

}