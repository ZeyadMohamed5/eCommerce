import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { AuthFormProps } from "../../types/types";

const SignupForm: React.FC<AuthFormProps> = ({ toggleForm }) => {
  const { signUp } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [matchPassword, setMatchPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setError("Email and password are required.");
      return;
    }

    if (password !== matchPassword) {
      setError("Passwords not matching");
    } else if (email && password.length >= 6 && matchPassword) {
      signUp(email, password);
      toggleForm();
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const password = e.target.value;
    setPassword(password);
    if (password.length <= 5) {
      setError("Password must be at least 6 characters.");
    } else {
      setError("");
    }
  };

  return (
    <div className="AuthFormStyle">
      <h3 className="AuthFormHeading">SignUp</h3>
      <form>
        <div className="flex flex-col py-4 gap-2">
          <label htmlFor="email" className="text-gray-700">
            Email
          </label>
          <input
            className="AuthFormInputs"
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            name="email"
          />
          <label htmlFor="password" className="text-gray-700 mt-4">
            Password
          </label>
          <input
            className="AuthFormInputs"
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            name="password"
          />
          <label htmlFor="passwordAgain" className="text-gray-700 mt-4">
            Enter Password Again
          </label>
          <input
            className="AuthFormInputs"
            type="password"
            id="passwordAgain"
            name="password"
            value={matchPassword}
            onChange={(e) => setMatchPassword(e.target.value)}
          />

          <button
            onClick={handleSignUp}
            type="button"
            className="AuthFormButton"
          >
            SignUp →
          </button>
        </div>
      </form>
      {error && <p className="text-red-500 text-center py-2">{error}</p>}

      <p className="text-center text-gray-400">
        Already have an account ?{" "}
        <span className="text-main-clr cursor-pointer" onClick={toggleForm}>
          Log In
        </span>
      </p>
    </div>
  );
};
export default SignupForm;
