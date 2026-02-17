import { useState } from "react";
import TextField from "../components/ui/TextField";
import { motion } from "framer-motion";

type Props = {
  active: boolean;
};

export default function SignUp({ active }: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const container = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.15,
      },
    },
  };

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // Pasword
  const [confirm, setConfirm] = useState("");
  const match = password === confirm && confirm.length > 0;

  const handleSignup = async () => {
    setError("");
    setSuccess(false);

    if (!name || !email || !password || !confirm) {
      setError("Please fill all fields");
      return;
    }

    if (!match) {
      setError("Passwords do not match");
      return;
    }

    if (strength === 0) {
      setError("Password too weak");
      return;
    }

    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    setLoading(false);
    setSuccess(true);
    setTimeout(() => setSuccess(false), 2000);

    // RESET FORM
    setName("");
    setEmail("");
    setPassword("");
    setConfirm("");
  };

  const getStrength = (pwd: string) => {
    if (pwd.length < 6) return 0;
    if (pwd.match(/^(?=.*[A-Z])(?=.*[0-9]).{6,}$/)) return 2;
    return 1;
  };

  const strength = getStrength(password);

  const item = {
    hidden: { opacity: 0, y: 18 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      animate={active ? "show" : "hidden"}
      variants={container}
      className="w-full max-w-[360px]"
    >
      <motion.h2 variants={item} className="text-2xl font-semibold mb-6">
        Create account
      </motion.h2>

      <div className="space-y-5">
        <motion.div variants={item}>
          <TextField label="Full name" value={name} onChange={setName} />
        </motion.div>

        <motion.div variants={item}>
          <TextField label="Email" value={email} onChange={setEmail} />
        </motion.div>

        <motion.div variants={item}>
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={setPassword}
          />
          <TextField
            label="Confirm password"
            type="password"
            value={confirm}
            onChange={setConfirm}
          />

          <p
            className={`text-xs ${confirm.length === 0 ? "text-zinc-400" : match ? "text-green-600" : "text-red-500"}`}
          >
            {confirm.length === 0
              ? "Re-enter your password"
              : match
                ? "Passwords match ✓"
                : "Passwords do not match"}
          </p>

          <div className="h-2 rounded bg-zinc-200 overflow-hidden">
            <div
              className={`h-full transition-all duration-300 ${
                strength === 0
                  ? "w-1/3 bg-red-500"
                  : strength === 1
                    ? "w-2/3 bg-yellow-500"
                    : "w-full bg-green-500"
              }`}
            />
          </div>

          <p className="text-xs text-zinc-500">
            {strength === 0 && "Weak password"}
            {strength === 1 && "Medium password"}
            {strength === 2 && "Strong password"}
          </p>
        </motion.div>

        <button
          onClick={handleSignup}
          disabled={loading || !match || strength === 0}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg p-3 font-medium flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <span className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
          ) : (
            "Create account"
          )}
        </button>
        {error && <p className="text-sm text-red-500 text-center">{error}</p>}
        {success && (
          <p className="text-sm text-green-600 text-center">Account created!</p>
        )}
      </div>
    </motion.div>
  );
}
