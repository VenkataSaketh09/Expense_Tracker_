import React, { useState } from "react";
import AuthLayout from "../../components/Layouts/AuthLayout";
import Input from "../../components/Inputs/Input";
import { Link, useNavigate } from "react-router-dom";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const handleSubmit = async(e) => {
    e.preventDefault();
    if(!validateEmail(email)){
      setError("Please Enter a valid Email.")
      return
    }
    if(!password){
      setError("Please Enter the Password.")
      return
    }
    setError("")
    //Login API Call
  };
  return (
    <AuthLayout>
      <div>
        <h3>Welcome Back</h3>
        <p>Please Enter Your Details to Login</p>
        <form onSubmit={handleSubmit}>
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            label="Email Address"
            placeholder="saketh@mail.com"
            type="text"
          />
          <Input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            label="Password"
            placeholder="Min 8 characters"
            type="password"
          />
          {error && <p className="text-xs text-red-500 pb-2.5">{error}</p>}
          <button type="submit" className="btn-primary">
            Login
          </button>
          <p>
            Don't have an Account?{" "}
            <Link className="font-medium text-[#875cf5] underline" to="/signup">
              SignUp
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
};

export default Login;
