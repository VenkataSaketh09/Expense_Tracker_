import React, { useState } from "react";
import AuthLayout from "../../components/Layouts/AuthLayout";
import Input from "../../components/Inputs/Input";
import { Link, useNavigate } from "react-router-dom";
import ProfilePhotoSelector from "../../components/Inputs/ProfilePhotoSelector";
import { validateEmail } from "../../utils/helper";
const SignUp = () => {
  const [profilePic, setProfilePic] = useState(null);
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const handleSubmit = async(e) => {
    e.preventDefault();
    let profileImageUrl="";
    if(!userName){
      setError("Please Enter your Name")
      return
    }
    if(!validateEmail){
      setError("Please Enter a Valid Email")
      return
    }
    if(!password){
      setError("Please Enter a Password")
      return
    }
    setError("")
    //SignUp API Call
  };

  return (
    <AuthLayout>
      <div>
        <h3>Create an Account</h3>
        <p>Join us Today by Entering Your Details Below</p>
        <form onSubmit={handleSubmit}>
          <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="John Wick"
              label="Enter Your Full Name"
              type="text"
            />
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              label="Email Address"
              placeholder="saketh@mail.com"
              type="text"
            />
            <div className="row-span-2">
              <Input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                label="Password"
                placeholder="Min 8 characters"
                type="password"
              />
            </div>
          </div>
          {error && <p className="text-xs text-red-500 pb-2.5">{error}</p>}
          <button type="submit" className="btn-primary">
            SignUp
          </button>
          <p>
            Already have an Account?{" "}
            <Link className="font-medium text-[#875cf5] underline" to="/login">
              Login
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
};

export default SignUp;
