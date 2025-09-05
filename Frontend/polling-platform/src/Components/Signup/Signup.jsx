import React, { useState } from "react";
import styles from "./styles.module.css";

export default function Register() {
  const [form, setForm] = useState({ username: "", email: "", password: "" });

  const handleRegister = (e) => {
    e.preventDefault();
    alert(`Registered: ${form.username}, ${form.email}`);
  };

  return (
    <div className={styles.registerContainer}>
     
      <div className={styles.registerRight}>
        <form className={styles.registerForm} onSubmit={handleRegister}>
          <h2>Create Your Account</h2>
          <p>Fill in the details to register your account.</p>

          <label>Username</label>
          <input
            type="text"
            placeholder="Your name"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
          />

          <label>Email</label>
          <input
            type="email"
            placeholder="user@company.com"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="Enter password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />

          <button type="submit" className={styles.registerBtn}>
            Register
          </button>

          <div className={styles.divider}>OR REGISTER WITH</div>

          <div className={styles.socialButtons}>
            <button type="button">Google</button>
            <button type="button">Apple</button>
          </div>

          <p className={styles.switchText}>
            Already have an account? <a href="#">Log In</a>
          </p>
        </form>
      </div>
    </div>
  );
}
