import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import { createUser } from "../../services/UserService";

const genders = ["male", "female", "other"];

const blankForm = {
  firstName: "",
  lastName: "",
  age: "",
  gender: "",
  contactNumber: "",
  email: "",
  username: "",
  password: "",
  confirmPassword: "",
  address: "",
};

const labelize = (value) =>
  value ? `${value.charAt(0).toUpperCase()}${value.slice(1)}` : "";

const inputBase =
  "w-full rounded-xl border border-zinc-300 bg-zinc-100 px-4 py-3 text-sm text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-zinc-900 focus:bg-zinc-50";

const fieldErrorClass = " border-red-500 focus:border-red-600";

const actionButtonClassName =
  "w-full rounded-xl py-3 text-[11px] tracking-[0.2em]";

const SignUpPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState(blankForm);
  const [errors, setErrors] = useState({});
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = ({ target: { name, value } }) => {
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
    if (name === "password" && errors.confirmPassword) {
      setErrors((prev) => ({ ...prev, confirmPassword: "" }));
    }
  };

  const validate = () => {
    const nextErrors = {};
    const emailNorm = form.email.trim().toLowerCase();

    [
      ["firstName", "First name"],
      ["lastName", "Last name"],
      ["age", "Age"],
      ["gender", "Gender"],
      ["contactNumber", "Contact number"],
      ["email", "Email"],
      ["username", "Username"],
      ["password", "Password"],
      ["confirmPassword", "Confirm password"],
      ["address", "Address"],
    ].forEach(([key, label]) => {
      if (!String(form[key]).trim()) {
        nextErrors[key] = `${label} is required.`;
      }
    });

    const ageStr = String(form.age).trim();
    if (!nextErrors.age && ageStr && !/^\d+$/.test(ageStr)) {
      nextErrors.age =
        "Age must use numbers only (no letters, spaces, or symbols).";
    }

    const contact = String(form.contactNumber).trim();
    if (!nextErrors.contactNumber && contact && !/^\d{11}$/.test(contact)) {
      nextErrors.contactNumber =
        "Contact number must be exactly 11 digits (numbers only, e.g. 09171234567).";
    }

    if (!nextErrors.username && /\s/.test(form.username)) {
      nextErrors.username =
        "Username cannot contain spaces. Use letters, numbers, or underscores.";
    }

    if (!nextErrors.password && form.password.trim().length < 8) {
      nextErrors.password = "Password must be at least 8 characters long.";
    }

    if (
      !nextErrors.password &&
      !nextErrors.confirmPassword &&
      form.password.trim() &&
      form.confirmPassword.trim() &&
      form.password.trim() !== form.confirmPassword.trim()
    ) {
      nextErrors.confirmPassword = "Passwords do not match.";
    }

    if (!nextErrors.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailNorm)) {
      nextErrors.email =
        "Enter a valid email address (example: name@email.com).";
    }

    return nextErrors;
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError("");
    const nextErrors = validate();
    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      return;
    }
    setErrors({});

    try {
      setIsSubmitting(true);
      await createUser({
        firstName: form.firstName.trim(),
        lastName: form.lastName.trim(),
        age: form.age.trim(),
        gender: form.gender.trim().toLowerCase(),
        contactNumber: form.contactNumber.trim(),
        email: form.email.trim().toLowerCase(),
        username: form.username.trim().toLowerCase(),
        password: form.password.trim(),
        address: form.address.trim(),
      });
      navigate("/auth/signin");
    } catch (err) {
      console.error(
        "Sign up failed:",
        err.response?.data?.message || err.message,
      );
      setError(
        err.response?.data?.message ||
          "Could not create account. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass = (name) =>
    `${inputBase}${errors[name] ? fieldErrorClass : ""}`;

  const FieldError = ({ name }) =>
    errors[name] ? (
      <p
        id={`signup-${name}-error`}
        className="mt-1 text-xs text-red-600"
        role="alert"
      >
        {errors[name]}
      </p>
    ) : null;

  return (
    <>
      <h1 className="text-3xl font-bold tracking-tight text-[#0C3AA7] sm:text-4xl">
        Sign Up
      </h1>
      <p className="mt-3 text-sm leading-6 text-white">
        Create your account with the same monochrome layout pattern and shared
        button treatment.
      </p>
      {error ? (
        <p className="mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </p>
      ) : null}
      <form className="mt-8 space-y-5" onSubmit={handleSignUp} noValidate>
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label
              htmlFor="first-name"
              className="text-sm font-medium text-[#0C3AA7]"
            >
              First Name
            </label>
            <input
              id="first-name"
              name="firstName"
              type="text"
              placeholder="First name"
              autoComplete="given-name"
              className={`mt-2 ${inputClass("firstName")}`}
              value={form.firstName}
              onChange={handleChange}
              aria-invalid={Boolean(errors.firstName)}
              aria-describedby={
                errors.firstName ? "signup-firstName-error" : undefined
              }
            />
            <FieldError name="firstName" />
          </div>
          <div>
            <label
              htmlFor="last-name"
              className="text-sm font-medium text-[#0C3AA7]"
            >
              Last Name
            </label>
            <input
              id="last-name"
              name="lastName"
              type="text"
              placeholder="Last name"
              autoComplete="family-name"
              className={`mt-2 ${inputClass("lastName")}`}
              value={form.lastName}
              onChange={handleChange}
              aria-invalid={Boolean(errors.lastName)}
              aria-describedby={
                errors.lastName ? "signup-lastName-error" : undefined
              }
            />
            <FieldError name="lastName" />
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="signup-age" className="text-sm font-medium text-[#0C3AA7]">
              Age
            </label>
            <input
              id="signup-age"
              name="age"
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              placeholder="Numbers only, e.g. 21"
              className={`mt-2 ${inputClass("age")}`}
              value={form.age}
              onChange={handleChange}
              aria-invalid={Boolean(errors.age)}
              aria-describedby={errors.age ? "signup-age-error" : undefined}
            />
            <FieldError name="age" />
          </div>
          <div>
            <label
              htmlFor="signup-gender"
              className="text-sm font-medium text-[#0C3AA7]"
            >
              Gender
            </label>
            <select
              id="signup-gender"
              name="gender"
              className={`mt-2 ${inputClass("gender")} bg-zinc-100`}
              value={form.gender}
              onChange={handleChange}
              aria-invalid={Boolean(errors.gender)}
              aria-describedby={
                errors.gender ? "signup-gender-error" : undefined
              }
            >
              <option value="">Select gender</option>
              {genders.map((g) => (
                <option key={g} value={g}>
                  {labelize(g)}
                </option>
              ))}
            </select>
            <FieldError name="gender" />
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label
              htmlFor="signup-contact"
              className="text-sm font-medium text-[#0C3AA7]"
            >
              Contact Number
            </label>
            <input
              id="signup-contact"
              name="contactNumber"
              type="text"
              inputMode="numeric"
              maxLength={11}
              placeholder="11 digits, e.g. 09171234567"
              autoComplete="tel"
              className={`mt-2 ${inputClass("contactNumber")}`}
              value={form.contactNumber}
              onChange={handleChange}
              aria-invalid={Boolean(errors.contactNumber)}
              aria-describedby={
                errors.contactNumber ? "signup-contactNumber-error" : undefined
              }
            />
            <FieldError name="contactNumber" />
          </div>
          <div>
            <label
              htmlFor="signup-email"
              className="text-sm font-medium text-[#0C3AA7]"
            >
              Email Address
            </label>
            <input
              id="signup-email"
              name="email"
              type="email"
              placeholder="Email"
              autoComplete="email"
              className={`mt-2 ${inputClass("email")}`}
              value={form.email}
              onChange={handleChange}
              aria-invalid={Boolean(errors.email)}
              aria-describedby={
                errors.email ? "signup-email-error" : undefined
              }
            />
            <FieldError name="email" />
          </div>
        </div>

        <div>
          <label
            htmlFor="signup-username"
            className="text-sm font-medium text-[#0C3AA7]"
          >
            Username
          </label>
          <input
            id="signup-username"
            name="username"
            type="text"
            placeholder="No spaces (e.g. juandelacruz01)"
            autoComplete="username"
            className={`mt-2 ${inputClass("username")}`}
            value={form.username}
            onChange={handleChange}
            aria-invalid={Boolean(errors.username)}
            aria-describedby={
              errors.username ? "signup-username-error" : undefined
            }
          />
          <FieldError name="username" />
        </div>

        <div>
          <label
            htmlFor="signup-password"
            className="text-sm font-medium text-[#0C3AA7]"
          >
            Password
          </label>
          <div className="relative mt-2">
            <input
              id="signup-password"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="At least 8 characters"
              autoComplete="new-password"
              className={`${inputBase} pr-14${errors.password ? fieldErrorClass : ""}`}
              value={form.password}
              onChange={handleChange}
              aria-invalid={Boolean(errors.password)}
              aria-describedby={
                errors.password
                  ? "signup-password-error"
                  : "signup-password-hint"
              }
            />
            <button
              type="button"
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg px-2 py-1 text-xs font-medium text-[#0C3AA7] hover:bg-zinc-200/80"
              onClick={() => setShowPassword((prev) => !prev)}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
          {errors.password ? (
            <FieldError name="password" />
          ) : (
            <p
              id="signup-password-hint"
              className="mt-2 text-xs leading-5 text-white"
            >
              Use a secure password with letters, numbers, and symbols.
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="signup-confirm-password"
            className="text-sm font-medium text-[#0C3AA7]"
          >
            Confirm password
          </label>
          <div className="relative mt-2">
            <input
              id="signup-confirm-password"
              name="confirmPassword"
              type={showPassword ? "text" : "password"}
              placeholder="Re-enter your password"
              autoComplete="new-password"
              className={`${inputBase} pr-14${errors.confirmPassword ? fieldErrorClass : ""}`}
              value={form.confirmPassword}
              onChange={handleChange}
              aria-invalid={Boolean(errors.confirmPassword)}
              aria-describedby={
                errors.confirmPassword
                  ? "signup-confirmPassword-error"
                  : undefined
              }
            />
            <button
              type="button"
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg px-2 py-1 text-xs font-medium text-[#0C3AA7] hover:bg-zinc-200/80"
              onClick={() => setShowPassword((prev) => !prev)}
              aria-label={
                showPassword ? "Hide confirm password" : "Show confirm password"
              }
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
          <FieldError name="confirmPassword" />
        </div>

        <div>
          <label
            htmlFor="signup-address"
            className="text-sm font-medium text-[#0C3AA7]"
          >
            Address
          </label>
          <textarea
            id="signup-address"
            name="address"
            placeholder="Street, city, region"
            autoComplete="street-address"
            rows={3}
            className={`mt-2 resize-y ${inputClass("address")}`}
            value={form.address}
            onChange={handleChange}
            aria-invalid={Boolean(errors.address)}
            aria-describedby={
              errors.address ? "signup-address-error" : undefined
            }
          />
          <FieldError name="address" />
        </div>

        <Button
          type="submit"
          variant="custom2"
          className={actionButtonClassName}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Creating…" : "Create Account"}
        </Button>
        <div className="grid gap-3 pt-2 sm:grid-cols-2">
          <Button
            type="button"
            variant="custom1"
            className={actionButtonClassName}
          >
            Sign Up with Google
          </Button>
          <Button
            type="button"
            variant="custom1"
            className={actionButtonClassName}
          >
            Sign Up with Apple
          </Button>
        </div>
      </form>
      <div className="mt-8 border-t border-zinc-200 pt-6 text-sm text-white">
        Already have an account?{" "}
        <Link
          to="/auth/signin"
          className="font-semibold text-[#0C3AA7] transition hover:text-white"
        >
          Log In
        </Link>
      </div>
    </>
  );
};

export default SignUpPage;
