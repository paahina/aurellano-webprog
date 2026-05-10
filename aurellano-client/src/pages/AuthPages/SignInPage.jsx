import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import { loginUser } from "../../services/UserService";

const inputClasses =
  "mt-2 w-full rounded-xl border border-zinc-300 bg-zinc-100 px-4 py-3 text-sm text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-zinc-900 focus:bg-zinc-50";

const actionButtonClassName =
  "w-full rounded-xl py-3 text-[11px] tracking-[0.2em]";

const fieldErrorClass = " border-red-500 focus:border-red-600";

const SignInPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [errors, setErrors] = useState({});

  const validate = () => {
    const nextErrors = {};
    const emailNorm = email.trim().toLowerCase();

    if (!email.trim()) {
      nextErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailNorm)) {
      nextErrors.email =
        "Enter a valid email address (example: name@email.com).";
    }

    if (!password.trim()) {
      nextErrors.password = "Password is required.";
    } else if (password.trim().length < 8) {
      nextErrors.password = "Password must be at least 8 characters long.";
    }

    return nextErrors;
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (errors.email) {
      setErrors((prev) => ({ ...prev, email: "" }));
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (errors.password) {
      setErrors((prev) => ({ ...prev, password: "" }));
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    const nextErrors = validate();
    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      return;
    }
    setErrors({});

    try {
      const { data } = await loginUser({
        email: email.trim(),
        password: password.trim(),
      });
      console.log("Login successful:", data);

      localStorage.setItem("token", data.token);
      localStorage.setItem("firstName", data.firstName);
      localStorage.setItem("type", data.type);

      navigate("/dashboard", {
        state: { firstName: data.firstName, type: data.type },
      });
    } catch (err) {
      console.error(
        "Login failed:",
        err.response?.data?.message || err.message,
      );
      setError(
        err.response?.data?.message || "Login failed. Please try again.",
      );
    }
  };

  return (
    <>
      <h1 className="text-3xl font-bold tracking-tight text-[#0C3AA7] sm:text-4xl">
        Log In
      </h1>
      <p className="mt-3 text-sm leading-6 text-white">
        Access your account using the same monochrome wireframe language used
        across the site.
      </p>
      {error ? (
        <p className="mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </p>
      ) : null}
      <form className="mt-8 space-y-5" onSubmit={handleLogin} noValidate>
        <div>
          <label
            htmlFor="signin-email"
            className="text-sm font-medium text-[#0C3AA7]"
          >
            Email Address
          </label>
          <input
            id="signin-email"
            name="email"
            type="email"
            placeholder="Enter your email"
            autoComplete="email"
            className={`${inputClasses}${errors.email ? fieldErrorClass : ""}`}
            value={email}
            onChange={handleEmailChange}
            autoFocus
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "signin-email-error" : undefined}
          />
          {errors.email ? (
            <p
              id="signin-email-error"
              className="mt-1 text-xs text-red-600"
              role="alert"
            >
              {errors.email}
            </p>
          ) : null}
        </div>
        <div>
          <label
            htmlFor="signin-password"
            className="text-sm font-medium text-[#0C3AA7]"
          >
            Password
          </label>
          <input
            id="signin-password"
            name="password"
            type="password"
            placeholder="Enter your password"
            autoComplete="current-password"
            className={`${inputClasses}${errors.password ? fieldErrorClass : ""}`}
            value={password}
            onChange={handlePasswordChange}
            aria-invalid={Boolean(errors.password)}
            aria-describedby={
              errors.password ? "signin-password-error" : "signin-password-hint"
            }
          />
          {errors.password ? (
            <p
              id="signin-password-error"
              className="mt-1 text-xs text-red-600"
              role="alert"
            >
              {errors.password}
            </p>
          ) : (
            <p id="signin-password-hint" className="mt-2 text-xs leading-5 text-white">
              It must be a combination of minimum 8 letters, numbers, and symbols.
            </p>
          )}
        </div>
        <div className="flex items-center justify-between gap-4 text-sm">
          <label className="flex items-center gap-2 text-white">
            <input
              type="checkbox"
              className="h-4 w-4 rounded border-zinc-300 accent-zinc-900"
            />
            <span>Remember me</span>
          </label>
          <button
            type="button"
            className="font-medium text-[#0C3AA7] transition hover:text-zinc-900"
          >
            Forgot Password?
          </button>
        </div>
        <Button
          type="submit"
          variant="custom2"
          className={actionButtonClassName}
        >
          Log In
        </Button>
        <div className="grid gap-3 pt-2 sm:grid-cols-2">
          <Button
            type="button"
            variant="custom1"
            className={actionButtonClassName}
          >
            Log In with Google
          </Button>
          <Button
            type="button"
            variant="custom1"
            className={actionButtonClassName}
          >
            Log In with Apple
          </Button>
        </div>
      </form>
      <div className="mt-8 border-t border-[#0C3AA7] pt-6 text-sm text-white">
        No account yet?{" "}
        <Link
          to="/auth/signup"
          className="font-semibold text-[#0C3AA7] transition hover:text-zinc-500"
        >
          Sign Up
        </Link>
      </div>
    </>
  );
};

export default SignInPage;
