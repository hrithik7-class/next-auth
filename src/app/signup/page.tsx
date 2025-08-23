"use client"

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Input from "@/components/Input"
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import Link from "next/link";


const Singup = () => {
    const { watch, handleSubmit, register, formState: { errors }, } = useForm();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [buttonDisable, setButtonDisable] = useState(true);

    const username = watch("username");
    const email = watch("email");
    const password = watch("password");



    const onSubmit = async (data: any) => {
        try {
            console.log(data);
            setLoading(true)
            const res = await axios.post("/api/users/signup", data)
            console.log("Form Data:", res.data);
            toast.success("User Signup successfully");
            setLoading(false);
            router.push("/login")

        } catch (error: any) {
            console.log(error.message)
            toast.error(error);

        } finally {
            setLoading(false)
        }
    }


    useEffect(() => {
        if (!email && !password && !username) {
            setButtonDisable(true)
        } else {
            setButtonDisable(false)
        }
    }, [username, email, password])

    return (
        <div className="flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="p-4  mx-auto bg-black  px-4 py-2 rounded-sm  text-white space-y-3">
                <h1 className="text-3xl font-semibold text-center ">{loading ? "Loading..." : "Signup"}</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Input
                        label="Username"
                        name={"username"}
                        type="text"
                        placeholder="Enter your Username"
                        register={register}
                        rules={{ required: "Username is  required" }}
                        error={errors.username?.message as string}
                    />
                    <Input
                        label="Email"
                        name={"email"}
                        type="email"
                        placeholder="Enter you email"
                        register={register}
                        rules={{ required: "Email is required", pattern: { value: /\S+@\S+\.\S+/, message: "Invalid email" } }}
                        error={errors.email?.message as string}

                    />

                    <Input
                        label="Password"
                        name="password"
                        type="password"
                        placeholder="Enter your password"
                        register={register}
                        rules={{ required: "Password is required", minLength: { value: 6, message: "Min 6 characters" } }}
                        error={errors.password?.message as string}
                    />

                    <button
                        type="submit"
                        className="p-2 w-full mt-5 border bg-gray-400 rounded-md focus:border-gray-600
                         focus:outline-none mb-4"
                    >
                        {buttonDisable ? "Not SignIn.." : "SignIn"}
                    </button>

                </form>
                <Link href="/login" >visit the login page</Link>
            </div>
        </div>
    )
}
export default Singup