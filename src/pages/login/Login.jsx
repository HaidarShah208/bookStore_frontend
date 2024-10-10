import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { authActions } from "../../store/auth/auth";
import Cookies from "js-cookie";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);  
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const handleSubmit = async(e) => {
    e.preventDefault();
    if(!email || !password){
      toast.error("Please fill in all fields");
      return;
    }
    setLoading(true);  
    try {
      const response = await axios.post("https://book-store-backend-gamma-neon.vercel.app/api/v1/login", {
        email,
        password,
      });
      Cookies.set("token", response.data.token, { expires: 1 });
      toast.success("Login successful!");
      dispatch(authActions.login())
      dispatch(authActions.changeRole(response.data.role))
     Cookies.set("role",response.data.role,{ expires: 1 })
      navigate("/");
    } catch (error) {
      toast.error(error.response.data.message);
      console.error("Error during sign-up:", error);
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div className="h-screen bg-zinc-900 flex items-center justify-center">

    <div className="w-[400px]  bg-zinc-850 border border-white/50 backdrop-blur-sm rounded-lg p-8 text-center ">
    <form onSubmit={handleSubmit} className="flex flex-col">
      <h2 className="text-2xl mb-5 text-white">Login</h2>

      <div className="relative border-b-2 border-gray-400 my-4">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="Email"
          className="w-full h-10 bg-transparent border-none outline-none text-white text-lg"
        />
      
      </div>

      <div className="relative border-b-2 border-gray-400 my-4">
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          
          required
          placeholder="Password"
          className="w-full h-10 bg-transparent border-none outline-none text-white text-lg"
        />
  
      </div>

      <div className="flex justify-between items-center mt-6 mb-8 text-white">
        <label htmlFor="remember" className="flex items-center">
          <input
            type="checkbox"
            id="remember"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            className="accent-white"
          />
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
      {loading?"loging in...":'Log In'}
      </button>

      <div className="text-white mt-8">
        <p>
          Don't have an account?{" "}
          <Link to={'/signup'} className="text-gray-300 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </form>
  </div>
  </div>

  );
};

export default Login;
