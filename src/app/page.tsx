"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import Image from "next/image";


export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });

  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);
      console.log("Login Successful", response.data);
      router.push("users/admin/dashboard");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <section className="flex h-screen items-center justify-center bg-gray-200">
      <div className=" lg:w-1/2 ml-24 mr-24 bg-white px-10 py-20 rounded-3xl items-center justify-center border-2 border-gray-200">
        <h2 className="font-semibold text-center text-4xl mt-4 text-[#002D74]">Welcome User</h2>
        <p className="text-md text-center text-[#002D74] mt-4">
          {loading ? "Processing" : "Enter details for Login"}
        </p>
        <br />
        <div>
          <div>
            <label htmlFor="email" className="text-lg font-medium text-[#002D74]">Email</label>
            <input
              className="w-full border-2 border-gray-100 rounded-xl p-3 mt1 bg-transparent text-black"
              id="email"
              type="text"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              placeholder="Email"
            />
          </div>
          <div>
            <label htmlFor="password" className="text-lg font-medium text-[#002D74]">Password</label>
            <input
              className="w-full border-2 border-gray-100 rounded-xl p-3 mt1 bg-transparent text-black"
              id="password"
              type="password"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              placeholder="Password"
            />
          </div>
          <div className="mt-8 flex justify-between items-center">
            <div>
              <input type="checkbox" id="remember"/>
              <label htmlFor="remember" className="text-[#002D74]">Remember Me</label>
            </div>
          </div>
          <div className="mt-8 flex flex-col gap-y-4">
          <button
            onClick={() => onLogin()}
            className="bg-[#002D74] hover:bg-blue-700 rounded-xl text-white py-2"
          >
            {buttonDisabled ? "Login Disabled" : "Login"}
          </button>
          <Link href="/signup" className="text-black">Signup</Link>
          </div>
        </div>
      </div>
      <div className="hidden bg-gray-200 lg:flex h-full w-1/2 items-center justify-center mr-12">
        <Image src={"/images/sarang-login.jpg"} alt="login image" width={750} height={950} />
      </div>
      <Toaster position="bottom-right" reverseOrder={false} />
    </section>
  );
}
