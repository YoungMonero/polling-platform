import React, { useState } from 'react';
import styles from './styles.module.css';
// import { Link } from 'react-router-dom';
import PasswordInput from '../../Components/PassWord/PasswordInput.jsx';
import { validateEmail } from '../../utils/helper.js';

const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)


  const handleLogin = async(e) => {
    e.preventDefault()

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
      
      <div className={styles.container}>

        <form onSubmit= {handleLogin}>
          <h2>Login</h2>
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

           {error && <p className='error'>{error}</p>}

          <button type="submit">Login</button>
          <p>Not registered yet? <a >Create an Account</a></p>
        </form>


      </div>
    </div>
  );
};

export default Login;