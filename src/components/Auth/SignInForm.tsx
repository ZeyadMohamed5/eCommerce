import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { AuthFormProps } from "../../types/types";
import { useNavigate } from "react-router-dom";

const SignInForm: React.FC<AuthFormProps> = ({ toggleForm }) => {
  const { signIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const success = signIn(email, password);
    if (success) {
      navigate("/");
    } else {
      setError("Invalid email or password.");
      setTimeout(() => setError(""), 3000);
    }
  };
  return (
    <div className="AuthFormStyle">
      <small className="text-gray-500 py-3 text-[15px] ">Welcome back!!</small>
      <h3 className="AuthFormHeading">Login</h3>
      <form>
        <div className="flex flex-col py-4 gap-2">
          <label htmlFor="email" className="text-gray-700">
            Email
          </label>
          <input
            className="AuthFormInputs"
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="password" className="text-gray-700 mt-4">
            Password
          </label>
          <input
            className="AuthFormInputs"
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            onClick={handleLogin}
            type="button"
            className="AuthFormButton"
          >
            Login →
          </button>
        </div>
      </form>
      {error && <p className="text-red-500 text-center py-2">{error}</p>}

      <p className="text-center text-gray-400">
        I dont have an account ?{" "}
        <span className="text-main-clr cursor-pointer" onClick={toggleForm}>
          Sign Up
        </span>
      </p>
    </div>
  );
};
export default SignInForm;
