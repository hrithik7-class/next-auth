"use client"

import Input from "@/components/Input";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";


const Login = () => {
  const router = useRouter();
  const { register, handleSubmit, watch, formState: { errors }, } = useForm();
  const [loading, setLoading] = useState(false);
  const [buttonDisable, setButtonDisable] = useState(true);

  const email = watch("email");
  const password = watch("password");

  useEffect(() => {
    if (email && password) {
      setButtonDisable(false);
    } else {
      setButtonDisable(true);
    }
  }, [email, password]);


  const onSubmit = async (data: any) => {
    try {
      setLoading(true)
      const res = await axios.post("/api/users/login", data)
      console.log("Form Data:", res.data);
      setLoading(false)
      toast.success("Login Successfully");
      router.push('/');
    } catch (error: any) {
      console.log(error.message)
      toast.error(error.message);
    } finally {
      setLoading(false)
    }
  };

  return (
    
      <div className="flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="p-4  mx-auto bg-black  px-4 py-2 rounded-sm  text-white space-y-3">
          <h1 className="text-3xl font-semibold text-center ">{loading ? "Loading..." : "Login"}</h1>
          <form onSubmit={handleSubmit(onSubmit)} >
            <Input
              label="Email"
              name="email"
              type="email"
              placeholder="Enter your email"
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
              {buttonDisable ? "Not Login.." : "Login"}
            </button>
          </form>
          <Link href="/signup" >visit the signup page</Link>
        </div>
      </div>
  )
};

export default Login;
