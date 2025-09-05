import React, { useState } from 'react';
import styles from'./styles.module.css';
import PasswordInput from '../PassWord/PasswordInput.js';
import { validateEmail } from '../../utils/helper.js';

const Signup = () => {
    const [name, setName] = useState ('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)
  
  
    const handleSignup = async(e) => {
      e.preventDefault()

      if (!name) {
        setError('Please enter your name')
        return 
      }
   
      if (!validateEmail(email)) {
        setError('Please enter a valid email address.')
        return;
      }
  
      if (!password) {
        setError('Please enter the password')
        return 
      }
  
      setError('')
    }
  
  
    return (
      <div>
        
        <div className={styles.signupContainer}>
  
          <form onSubmit= {handleSignup}>
            <h2>SignUp</h2>
             <input 
              type="text" 
               placeholder='Name' 
               className='name'  
               value={name}
               onChange={(e)=> setName(e.target.value)}
               />

            <input 
              type="text" 
               placeholder='Email' 
               className='inputbox' 
               value={email}
               onChange={(e)=> setEmail(e.target.value)} 
               />
               
            <PasswordInput
               value={password}
               onChange={(e)=> setPassword(e.target.value)}
             />
  
             {error && <p className={styles.error}>{error}</p>}
  
            <button type="submit">Login</button>
            <p>Already have and account?  <a>Login</a></p>
          </form>
  
  
        </div>
      </div>
    );
  };

export default Signup;