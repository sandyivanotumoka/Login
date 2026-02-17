import { useState } from "react";
import TextField from "../components/ui/TextField";
import { motion } from "framer-motion";

type Props = {
  active: boolean;
};

export default function SignIn({ active }: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const container = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.15,
      },
    },
  };

  const handleLogin = async () => {
    setLoading(true);
    setError(false);

    await new Promise((r) => setTimeout(r, 900));

    const success = Math.random() > 0.5;

    if (!success) {
      setError(true);
      setLoading(false);
      return;
    }

    // SUCCESS
    setEmail("");
    setPassword("");
    setLoading(false);
  };

  const item = {
    hidden: { opacity: 0, y: 18 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      animate={{
        opacity: active ? 1 : 0,
        x: error ? [-10, 10, -6, 6, -3, 3, 0] : active ? 0 : 40,
        scale: active ? 1 : 0.96,
      }}
      transition={{ duration: 0.45 }}
      className="w-full max-w-[360px]"
    >
      <motion.h2 variants={item} className="text-2xl font-semibold mb-6">
        Sign in
      </motion.h2>

      <div className="space-y-5">
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
        </motion.div>

        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg p-3 font-medium flex items-center justify-center gap-2 disabled:opacity-70"
        >
          {loading ? (
            <span className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
          ) : (
            "Sign in"
          )}
        </button>
        {error && (
          <p className="text-sm text-red-500 text-center">
            Invalid email or password
          </p>
        )}
      </div>
    </motion.div>
  );
}
