import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export const GetDataFromToken = async(request : NextRequest) =>{

     try {
        const encodedToken =  request.cookies.get("token")?.value || "";
        const decodedToken:any = jwt.verify(encodedToken , process.env.SECRET_TOKEN!);
        return decodedToken.id;
     } catch (error :any) {
        throw new Error(error.message); 
     }
}