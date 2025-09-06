import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api.js"; 
import { connectSocket, onUserRegistered } from "../../services/socket.js";
import styles from "./styles.module.css";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // Validate form before sending request
  const validate = () => {
    const newErrors = {};
    if (!form.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) newErrors.email = "Invalid email";
    if (!form.password.trim()) newErrors.password = "Password is required";
    else if (form.password.length < 6) newErrors.password = "Password must be at least 6 characters";
    return newErrors;
  };

  // Handle login
  const handleLogin = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    try {
      const { data } = await api.post("/api/auth/login", form);
      console.log("Login successful:", data);

      // You might want to store JWT token here:
      localStorage.setItem("token", data.token);

      navigate("/dashboard");
    } catch (error) {
      console.error("Login failed:", error.message);
      setErrors({ general: "Invalid email or password" });
    }
  };

  //  Handle input changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  
  useEffect(() => {
    connectSocket();
    onUserRegistered((data) => {
      console.log("Socket event:", data);
    });
    return () => {
      // Cleanup socket listeners
    };
  }, []);

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginRight}>
        <form className={styles.loginForm} onSubmit={handleLogin}>
          <h2>Welcome Back</h2>
          <p>Enter your email and password to access your account.</p>

          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="user@company.com"
            value={form.email}
            onChange={handleChange}
          />
          {errors.email && <p className={styles.error}>{errors.email}</p>}

          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter password"
            value={form.password}
            onChange={handleChange}
          />
          {errors.password && <p className={styles.error}>{errors.password}</p>}
          {errors.general && <p className={styles.error}>{errors.general}</p>}

          <div className={styles.loginOptions}>
            <label>
              <input type="checkbox" /> <p>Remember Me</p>
            </label>
            <a href="#">Forgot Your Password?</a>
          </div>

          <button type="submit" className={styles.loginBtn}>
            Log In
          </button>

          <div className={styles.divider}>OR LOGIN WITH</div>

          <div className={styles.socialButtons}>
            <button type="button">Google</button>
            <button type="button">Apple</button>
          </div>

          <p className={styles.switchText}>
            Don’t Have An Account? <a href="/host/register">Register Now</a>
          </p>
        </form>
      </div>
    </div>
  );
}
