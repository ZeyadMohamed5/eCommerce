import { useState } from "react";
import SignupForm from "../components/Auth/SignupForm";
import SignInForm from "../components/Auth/SignInForm";

const AuthPage = () => {
  const [isSignUp, setIsSignUp] = useState(false);

  return (
    <>
      {isSignUp ? (
        <SignupForm toggleForm={() => setIsSignUp(false)} />
      ) : (
        <SignInForm toggleForm={() => setIsSignUp(true)} />
      )}
    </>
  );
};
export default AuthPage;
