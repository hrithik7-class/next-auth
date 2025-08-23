"use client"


import axios from "axios";
import Link from "next/link";
import { useEffect ,useState } from "react";

export default function VerifyEmail() {
    const [verified ,setVerified] = useState(false);
    const [token , setToken] = useState("");
    const [error , setError] = useState(false);

    const verifyEmailUser =async ()=>{
        try {
            console.log("hj");
          const res =await axios.post('/api/users/verifyemail', {token});
          console.log(res)
            setVerified(true);
          console.log("hello")
            console.log("hello")
          
            console.log("hello2")
        } catch (error:any) {
            setError(error)
            console.log(error.response.data);
        }
    }

    useEffect(()=>{
        const tokenUrl = window.location.search.split("=")[1];
        setToken(tokenUrl || "");
    },[])

    useEffect(()=>{
        if(token.length > 0){
             verifyEmailUser();
        }
    },[token])

     return(
         <div className="flex flex-col items-center justify-center min-h-screen py-2">

            <h1 className="text-4xl">Verify Email</h1>
            <h2 className="p-2 bg-orange-500 text-black">{token ? `${token}` : "no token"}</h2>

            {verified && (
                <div>
                    <h2 className="text-2xl">Email Verified</h2>
                    <Link href="/login">
                        Login
                    </Link>
                </div>
            )}
            {error && (
                <div>
                    <h2 className="text-2xl bg-red-500 text-black">Error</h2>
                    
                </div>
            )}
        </div>
     )
    
}

