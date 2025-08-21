"use client";

import axios from "axios";
import toast from "react-hot-toast";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";


export default function ProfilePage() {
    const router = useRouter();
    const [user, setUser] = useState("Nothing");

    const onLogout = async () => {
        try {
            await axios.get("/api/users/logout");
            toast.success("Logout successfully");
            router.push('/login');
        } catch (error: any) {
            toast.error(error.message);
        }
    };

    const getData = async () => {
        try {
            const res = await axios.get("/api/users/user");
            console.log(res.data);
            setUser(res.data.data._id);

        } catch (error: any) {
            toast.error(error.message);
        }
    };

    return (
        <div className="flex flex-col items-center  justify-center min-h-screen  py-2 ">
            <h1>
                Profile
            </h1>
            <hr />
            <h2> {user === "Nothing" ? "" : <Link href={`profile/${user}`}>{user}</Link>}</h2>
            <p>This is user secure profile as you know..</p>

            <button className="mt-3 text-lg hover:cursor-pointer
             bg-white/70 hover:bg-white/100 text-gray-300
              p-2 rounded-md"
                onClick={onLogout}>Logout</button>

            <button className="mt-3 text-lg hover:cursor-pointer
             bg-blue-400 hover:bg-blue-600 text-gray-300
              p-2 rounded-md"
                onClick={getData}>GET-DATA</button>

        </div>
    )
}