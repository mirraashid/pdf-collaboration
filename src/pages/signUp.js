import React, { useState } from 'react';
import { useFirebaseApp } from 'reactfire';
import 'firebase/auth'
import TextField from '@material-ui/core/TextField';
import { formStyle } from '../helpers/inputFormStyle';

const SignUpPage = () => {
    //custom styling for form inputs
    const classes = formStyle();

    // Import firebase
    const firebase = useFirebaseApp();

     // User State
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        error: '',
    });

    const handleSubmit = async(e) => {
        e.preventDefault();

        // Sign up code here.
        await firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
          .then(result => {
            // Update the nickname
            result.user.updateProfile({
              displayName: user.name,
            })
          }).catch(error => {
            // Update the error
            setUser({
              ...user,
              error: error.message,
            })
          })
      }

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value,
            error: '',
          })
    }

        return(
            <div className="container centerAlign">
                <h1>SignUp</h1>
                <div className="contact-container modal-container">
                    <form onSubmit={handleSubmit}>
                        <TextField className={classes.textField} variant="outlined" type="text" required={true} label="Name" name="name" value={user.name} onChange={handleChange}/><br />
                        <TextField className={classes.textField} variant="outlined" type="email" required={true} label="Email" name="email" value={user.email} onChange={handleChange}/><br />
                        <TextField className={classes.textField} variant="outlined" type="password" required={true} label="Password" name="password" value={user.password} onChange={handleChange}/><br />
                        <button className="cust-primary-btn" type="submit">Sign Up</button>
                    </form>
                    {user.error && <h4>{user.error}</h4>}
                    <br/>
                    <a href="/login">Login</a>
                </div>
            </div>
        )
}

export default SignUpPage