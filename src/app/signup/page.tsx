"use client";

import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";
import axios from "axios";


export default function SignupPage() {
    const router = useRouter();
    const [user, setUser] = React.useState({
        username: "",
        email: "",
        password: ""
    });
    const signup = () => {

    };
    return (
        <div className="flex  items-center justify-center py-2 min-h-screen ">
            <div className="flex flex-col max-w-4xl bg-gray-600 px-8 py-6 rounded-md space-y-4">
                <h1 className="text-2xl text-emerald-400 font-bold  space-y-4 text-center">Signup</h1>
                <hr/>
                <div className=" flex flex-col  ">
                    <label htmlFor="username">Username</label>
                    <input className="" id="username" value={user.username}
                        onChange={(e) => setUser({ ...user, username: e.target.value })}
                        placeholder="Xyz"
                    />

                </div>

                <div className=" flex flex-col">
                    <label htmlFor="email">Email</label>
                    <input className="" id="email" value={user.email}
                        onChange={(e) => setUser({ ...user, email: e.target.value })}
                        placeholder="example12@gmail.com"
                    />

                </div>

                <div className=" flex flex-col">
                    <label htmlFor="password">Password</label>
                    <input className="" id="password" value={user.password}
                        onChange={(e) => setUser({ ...user, password: e.target.value })}
                        placeholder=".........."
                    />

                </div>
                <button className="p-2 border bg-gray-400 rounded-md focus:border-gray-600
                 focus:outline-none mb-4" onClick={signup}>
                    SignIn
                </button>
                <Link href="/login" >visit the login page</Link>


            </div>





        </div>
    )
}