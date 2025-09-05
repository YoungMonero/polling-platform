import React, {useState} from 'react'
import styles from './Password.module.css'
import {Eye, EyeOff} from 'lucide-react'

const Passwordinput = ({value, onChange, Placeholder}) => {
  const [isShowpassword, SetIsShowPassword] = useState(false); 

  const toggleShowPassword = () => {
    SetIsShowPassword(!isShowpassword)
  }

  return (
    <div className={styles.passwordinput}>
      <input 
        value={value}
        onChange={onChange}
        placeholder={Placeholder || 'password'}
        type={isShowpassword ? 'text': 'password'}
        className={styles.password}
      />

      {isShowpassword ? (
      <Eye
        size={22}
        className = {styles.showeye}
        onClick={() => toggleShowPassword()}
      />
      ) : (
        <EyeOff
        size={22}
        className={`${styles.showeye} ${styles.eyeoff}`}
        onClick={() => toggleShowPassword()}
        />
      )}

       
    </div>
  )
}

export default Passwordinput
