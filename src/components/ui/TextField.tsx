import { useState } from "react";
import clsx from "clsx";
import { FiEye, FiEyeOff } from "react-icons/fi";

type Props = {
  label: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
};

export default function TextField({
  label,
  type = "text",
  value,
  onChange,
}: Props) {
  const [focus, setFocus] = useState(false);
  const [show, setShow] = useState(false);

  const isPassword = type === "password";
  const active = focus || value.length > 0;

  return (
    <div className="relative">
      {/* glow background */}
      <div
        className={clsx(
          "absolute inset-0 rounded-lg transition duration-300 blur-md opacity-0",
          focus && "opacity-100 bg-indigo-500/20",
        )}
      />

      <input
        type={isPassword ? (show ? "text" : "password") : type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        className={clsx(
          "relative w-full p-3 pt-5 md:p-3 md:pt-5 rounded-lg bg-white border outline-none transition pr-10",
          focus
            ? "border-indigo-500 shadow-[0_0_0_1px_rgba(99,102,241,0.4)]"
            : "border-zinc-300",
        )}
      />

      {/* floating label */}
      <label
        className={clsx(
          "absolute left-3 transition-all pointer-events-none",
          active
            ? "top-1 text-xs text-indigo-500"
            : "top-3 text-sm text-zinc-400",
        )}
      >
        {label}
      </label>

      {/* eye toggle */}
      {isPassword && (
        <button
          type="button"
          onClick={() => setShow(!show)}
          className="absolute right-3 top-3 text-zinc-400 hover:text-zinc-700 transition"
        >
          {show ? <FiEyeOff size={18} /> : <FiEye size={18} />}
        </button>
      )}
    </div>
  );
}
