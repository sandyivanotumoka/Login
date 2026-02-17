import { useState } from "react";
import { motion } from "framer-motion";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import DotPattern from "../components/ui/DotPattern";

export default function AuthLayout() {
  const [signup, setSignup] = useState(false);
  // false = login aktif (form kanan)
  // true  = register aktif (form kiri)

  return (
    <div className="min-h-screen bg-[#0f172a] flex flex-col items-center md:justify-center px-4 py-10 md:py-0">
      {/* MOBILE SWITCH */}
      <div className="md:hidden mb-6 w-full max-w-sm flex gap-2 bg-white/10 p-1 rounded-xl">
        <button
          onClick={() => setSignup(false)}
          className={`flex-1 py-2 rounded-lg text-sm transition ${
            !signup ? "bg-white text-black" : "text-white"
          }`}
        >
          Sign In
        </button>

        <button
          onClick={() => setSignup(true)}
          className={`flex-1 py-2 rounded-lg text-sm transition ${
            signup ? "bg-white text-black" : "text-white"
          }`}
        >
          Sign Up
        </button>
      </div>

      <div className="relative w-full max-w-5xl md:h-[560px] bg-white rounded-3xl shadow-2xl overflow-hidden">
        <DotPattern />
        {/* FORM LAYER */}
        <div className="relative md:absolute md:inset-0 md:grid md:grid-cols-2 z-10">
          {/* KIRI: SIGN UP */}
          <div
            className={`flex items-center justify-center p-6 md:p-10 ${!signup ? "hidden md:flex" : "flex"}`}
          >
            <SignUp active={signup} />
          </div>

          {/* KANAN: SIGN IN */}
          <div
            className={`flex items-center justify-center p-6 md:p-10 ${signup ? "hidden md:flex" : "flex"}`}
          >
            <SignIn active={!signup} />
          </div>
        </div>

        {/* PANEL GESER */}
        <motion.div
          animate={{ x: signup ? "100%" : "0%" }}
          transition={{ type: "spring", stiffness: 70, damping: 18 }}
          className="hidden md:flex absolute top-0 left-0 w-1/2 h-full z-20 bg-gradient-to-br from-indigo-600 to-purple-600 text-white flex-col items-center justify-center text-center p-10"
        >
          <h2 className="text-3xl font-semibold mb-3">
            {signup ? "Welcome Back!" : "Hello, Friend!"}
          </h2>

          <p className="mb-6 max-w-xs">
            {signup ? "Already have an account?" : "Don't have an account yet?"}
          </p>

          <button
            onClick={() => setSignup(!signup)}
            className="border border-white px-6 py-2 rounded-lg hover:bg-white/10 transition"
          >
            {signup ? "Sign In" : "Sign Up"}
          </button>
        </motion.div>
      </div>
    </div>
  );
}
