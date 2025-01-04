import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth, db } from "./firebase";
import { setDoc, doc } from "firebase/firestore";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const Register = () => {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);


  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;
      console.log(user);
      if (user) {
        await setDoc(doc(db, "Users", user.uid), {
          firstName: fname,
          lastName: lname,
          email: user.email,
        });
      }
      console.log("User registered successfully!!");
      toast.success(
        "User registered successfully!! Now click on Login option to log in",
        { position: "top-center", theme: "colored" }
      );
      setFname("");
      setLname("");
      setEmail("");
      setPassword("");
    } catch (error) {
      console.error(error.message);
      toast.error(error.message, { position: "top-center", theme: "colored" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-r from-gray-900 to-black flex items-center justify-center px-6">
      <div className="py-6 md:py-8 px-5 md:px-10 bg-white/5 backdrop-blur-sm text-white box-border rounded-md shadow-lg border border-white/20  font-Inter">
        <form onSubmit={handleRegister}>
          <h3 className="text-center text-rose-600 font-bold text-[27px] md:text-3xl">
            Register to Cineworld
          </h3>

          <div className="mb-3 mt-6 md:mt-8">
            <label className="font-semibold">First Name</label>
            <input
              type="text"
              className="w-full mt-1 h-10 px-2 border bg-transparent rounded border-white/40 backdrop-blur-sm"
              placeholder="Enter first name"
              value={fname}
              onChange={(e) => setFname(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="font-semibold">Last Name</label>
            <input
              type="text"
              className="w-full mt-1 h-10 px-2 border bg-transparent rounded border-white/40 backdrop-blur-sm"
              placeholder="Enter last name"
              value={lname}
              onChange={(e) => setLname(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="font-semibold">Email address</label>
            <input
              type="email"
              className="w-full mt-1 h-10 px-2 border bg-transparent rounded border-white/40 backdrop-blur-sm"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="font-semibold">Password</label>
            <input
              type="password"
              className="w-full mt-1 h-10 px-2 border bg-transparent rounded border-white/40 backdrop-blur-sm"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="mt-6">
            <button
              type="submit"
              className={`w-full text-white font-semibold bg-rose-700 hover:bg-rose-700/80 active:scale-[0.98] py-2 rounded ${
                loading && "cursor-not-allowed"
              }`}
            >
              {loading ? "Registering..." : "Sign Up"}
            </button>
          </div>

         <div className="flex items-center justify-between mt-4 text-nowrap">
         <a href="/" className="text-red-500 text-sm lg:text-base hover:text-red-600">Explore as Guest</a>

           <p className="text-sm lg:text-base">
            Already a user?{" "} &nbsp;
            <a href="/login" className="text-red-500 text-base lg:text-xl hover:text-red-600">
              {" "}
              Login
            </a>
          </p>
         </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Register;
