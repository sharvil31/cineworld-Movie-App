import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { auth } from "./firebase";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("User logged in successfully!!");
      toast.success("User logged in successfully!!", {
        position: "top-center",
        theme: "colored",
      });
      setEmail("");
      setPassword("");
      navigate("/");
    } catch (error) {
      console.log("User logged in successfully!!");
      toast.error(error.message, {
        position: "top-center",
        theme: "colored",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-r from-gray-900 to-black flex items-center justify-center px-6">
      <div className="py-8 px-6 md:px-10 text-white bg-white/5 backdrop-blur-sm box-border rounded-md shadow-lg border border-white/20 font-Inter">
        <form onSubmit={handleLogin}>
          <h3 className="text-center text-rose-600 font-bold text-3xl">
            Login to Cineworld
          </h3>

          <div className="mb-3 mt-7 md:mt-10">
            <label className="font-semibold">Email address</label>
            <input
              type="email"
              className="w-full mt-1 h-10 px-2 border bg-transparent rounded border-white/40 backdrop-blur-sm"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="font-semibold">Password</label>
            <input
              type="password"
              className="w-full mt-1 h-10 px-2 border bg-transparent rounded border-neutral-400 backdrop-blur-sm"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="mt-6">
            <button
              type="submit"
              className={`w-full text-white font-semibold bg-rose-700 hover:bg-rose-700/80 active:scale-[0.98] py-2 rounded ${
                loading && "cursor-not-allowed"
              }`}
            >
              {loading ? "Logging in" : "Log in"}
            </button>
          </div>

          <div className="flex items-center justify-between mt-4 text-nowrap">
          <a href="/" className="text-red-500 text-sm lg:text-base hover:text-red-600">Explore as Guest</a>

          <p className="text-sm lg:text-base">
            New user?{" "}&nbsp;
            <a href="/register" className="text-red-500 text-base lg:text-lg hover:text-red-600">
              {" "}
              Register
            </a>
          </p>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
