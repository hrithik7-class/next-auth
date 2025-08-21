import { NextResponse } from "next/server";

export async function GET() {
    try {
        const  response = NextResponse.json({
            massage:"Logout successfully",
            success:true
        })
        response.cookies.set("token","",
            {
                httpOnly:true, expires: new Date(0)
        })
        return response
        
    } catch (error:any) {
        return NextResponse.json({
            error:error.message,
            message:"Error in Logout"
        },
        {
            status:500
        }); 
    }
}