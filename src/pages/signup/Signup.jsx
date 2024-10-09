import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setName] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!username || !password || !address || !email){
      toast.error("Please fill in all fields");
      return;
    }
    setLoading(true);
    console.log(username, password, email, address);
    try {
      const response = await axios.post(
        "https://book-store-backend-gamma-neon.vercel.app/api/v1/signup",
        {
          username,
          email,
          password,
          address,
        }
      );
      toast.success("Sign up successful!");
      navigate("/");
    } catch (error) {
      toast.error(error.response.data.error);
      console.error("Error during sign-up:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-auto py-6 bg-zinc-900 flex items-center justify-center">
      <div className="w-[400px]  bg-zinc-850 border border-white/50 backdrop-blur-sm rounded-lg p-8 text-center ">
        <form onSubmit={handleSubmit} className="flex flex-col">
          <h2 className="text-2xl mb-5 text-white">Sign up</h2>

          <div className="relative border-b-2 border-gray-400 my-4">
            <input
              type="text"
              value={username}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
              className="w-full h-10 bg-transparent border-none outline-none text-white text-lg"
            />
          </div>

          <div className="relative border-b-2 border-gray-400 my-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full h-10 bg-transparent border-none outline-none text-white text-lg"
            />
          </div>

          <div className="relative border-b-2 border-gray-400 my-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full h-10 bg-transparent border-none outline-none text-white text-lg"
            />
          </div>
          <div className="relative border-b-2 border-gray-400 my-4">
            <textarea
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Address"
              className="w-full h-32 bg-transparent border-none outline-none text-white text-lg"
            />
          </div>

          <div className="flex justify-between items-center mt-6 mb-8 text-white">
            <label htmlFor="remember" className="flex items-center">
              <input type="checkbox" id="remember" className="accent-white" />
              <p className="ml-2">Remember me</p>
            </label>
            <a href="#" className="text-gray-300 hover:underline">
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            className="bg-white text-black font-semibold py-3 px-6 rounded-lg text-lg hover:bg-transparent hover:text-white hover:border-white border-2 border-transparent transition-all duration-300"
          >
            {loading ? "Signing up..." : " Sign up"}
          </button>

          <div className="text-white mt-8">
            <p>
              Already have an account?{" "}
              <Link to={"/login"} className="text-gray-300 hover:underline">
                Log in
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
