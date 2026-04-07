import { Link } from "react-router-dom";

const variantClasses = {
  primary:
    "rounded-full bg-zinc-900 text-zinc-50 hover:bg-zinc-700 font-semibold",
  secondary:
    "rounded-full bg-zinc-50 text-zinc-900 hover:bg-zinc-200 font-semibold",
  custom1:
    "rounded-[0.8em] bg-[#ebebeb] text-[#0C3AA7] font-[700] shadow-[0_4px_10px_rgba(0,0,0,0.15)] hover:bg-[#d9d9d9]",
  custom2:
    "rounded-[0.8em] bg-[#0C3AA7] text-white font-[700] shadow-[0_4px_10px_rgba(0,0,0,0.15)] hover:bg-[#2256D1] cursor-pointer",
  custom3:
    "rounded-[0.8em] shadow-[4px_4px_10px_rgba(0,0,0,0.15)] shadow-[-4px_-4px_10px_rgba(255,255,255,0.8)] hover:bg-[#e1e1e1] cursor-pointer",
};

const Button = ({
  children,
  to,
  type = "button",
  variant = "secondary",
  className = "",
}) => {
  const classes = [
    "inline-flex items-center justify-center px-4 py-2 text-[10px] uppercase tracking-[0.24em] transition",
    variantClasses[variant] ?? variantClasses.secondary,
    className,
  ]
    .join(" ")
    .trim();
  if (to) {
    return (
      <Link to={to} className={classes}>
        {children}
      </Link>
    );
  }
  return (
    <button type={type} className={classes}>
      {children}
    </button>
  );
};

export default Button;
