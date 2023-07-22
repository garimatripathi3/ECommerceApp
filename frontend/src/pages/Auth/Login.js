import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import "../../styles/LoginStyles.css"; // Import the new CSS file
import { useAuth } from "../../context/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useAuth();

  const navigate = useNavigate();
  const location = useLocation();


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/v1/auth/login", {
        email,
        password,
      });
      if (res && res.data.success) {
        toast.success(res.data && res.data.message);
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
        navigate(location.state || "/");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  const handleGoogleLogin = () => {
    
    toast.info("Google login is not implemented yet.");
  };

  return (
    <Layout title="Login - Ecommer App">
      <div className="login-container">
        <form className="login-form" onSubmit={handleSubmit}>
          <h4 className="login-title">LOGIN</h4>

          <div className="form-group">
            <input
              type="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              id="exampleInputEmail"
              placeholder="Enter Email"
              required
            />
          </div>

          <div className="form-group">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
              id="exampleInputPassword"
              placeholder="Enter Password"
              required
            />
          </div>

          <div className="form-group">
            <button
              type="button"
              className="forgot-password-btn"
              onClick={() => {
                navigate("/forgot-password");
              }}
            >
              Forgot Password?
            </button>
          </div>

          <button type="submit" className="btn-primary">
            LOGIN
          </button>
        </form>

        <div className="social-login-container">
          <p>or</p>
          <button className="google-login-btn" onClick={handleGoogleLogin}>
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
              alt="Google Logo"
              className="google-logo"
            />
            Login with Google
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
