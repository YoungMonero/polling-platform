import React, { useState } from "react";
import styles from "./styles.module.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    alert(`Email: ${email}, Password: ${password}`);
  };

  return (
    <div className={styles.loginContainer}>
  
      <div className={styles.loginRight}>
        <form className={styles.loginForm} onSubmit={handleLogin}>
          <h2>Welcome Back</h2>
          <p>Enter your email and password to access your account.</p>

          <label>Email</label>
          <input
            type="email"
            placeholder="user@company.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

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
            Don’t Have An Account? <a href="#">Register Now.</a>
          </p>
        </form>
      </div>
    </div>
  );
}
