import React, { useState } from 'react';
import { useFirebaseApp } from 'reactfire';
import 'firebase/auth'
import TextField from '@material-ui/core/TextField';
import { formStyle } from '../helpers/inputFormStyle';

const LoginPage = () => {
    //custom styling for form inputs
    const classes = formStyle();

     // Import firebase
    const firebase = useFirebaseApp();

    // User State
  const [user, setUser] = useState({
    email: '',
    password: '',
    error: '',
  });

  // onChange function
  const handleChange = e => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
      error: '',
    })
  };

  // Submit function (Log in user)
  const handleSubmit = e => {
    e.preventDefault();
    
    // Log in code here.
    firebase.auth().signInWithEmailAndPassword(user.email, user.password)
      .then(result => {
        //user logged in
      })
      .catch(error => {
        // Update the error
        setUser({
          ...user,
          error: error.message,
        })
      })
  }

    return(
        <div className="container centerAlign">
            <h1>Login</h1>
            <div className="contact-container modal-container">
                <form onSubmit={handleSubmit}>
                <TextField className={classes.textField} variant="outlined" type="email" required={true} label="Email" name="email" onChange={handleChange}/><br />
                <TextField className={classes.textField} variant="outlined" type="password" required={true} label="Password"name="password" onChange={handleChange}/><br />
                    <button className="cust-primary-btn" type="submit">Login</button>
                </form>
                {user.error && <h4>{user.error}</h4>}
                <br/>
                <a href="/signup">SignUp</a>
            </div>
        </div>
    )
}

export default LoginPage