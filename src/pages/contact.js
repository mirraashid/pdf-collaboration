import React,{useState, useEffect} from 'react';
import firebase from 'firebase'
import 'firebase/auth'
import "firebase/database"
import TextField from '@material-ui/core/TextField';
import { formStyle } from '../helpers/inputFormStyle';


const ContactPage = () => {
    const classes = formStyle();
    

    const [contactData, setContactData] = useState({
        name: '',
        email: '',
        message: '',
        error: '',
    });

    const writeContactData = () => {
        var newPostKey = firebase.database().ref().child('contactUs').push().key;

        firebase.database().ref('contactUs/' + newPostKey).set({
          name: contactData.name,
          email: contactData.email,
          message : contactData.message
        }, (err) => {
            if (err) {
                // The write failed...
                setContactData({
                    ...contactData,
                    error: err,
                  })
              } else {
                // Data saved successfully!
                setContactData({
                    name: '',
                    email: '',
                    message: '',
                    error: '',
                });
                alert('Message Sent Successfully!')
              }
        });
      }

    const handleChange = (e) => {
        setContactData({
            ...contactData,
            [e.target.name]: e.target.value,
            error: '',
          })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('clicked');
        await writeContactData();
    }

    return(
        <div className="container centerAlign">
            <h1>Contact US</h1>
            <div className="modal-container">
                <form onSubmit={handleSubmit}>
                    <TextField className={classes.textField} variant="outlined" type="text" required={true} value={contactData.name} label="Name" name="name" onChange={handleChange}/><br />
                    <TextField className={classes.textField} variant="outlined" type="email" required={true} value={contactData.email} label="Email" name="email" onChange={handleChange}/><br />
                    <TextField className={classes.textField} multiline rows={4} variant="outlined" required={true} value={contactData.message} label="Message.." name="message" onChange={handleChange} /><br/>
                    <button className="cust-primary-btn" type="submit">Submit</button>
                </form>
                {contactData.error && <h4>{contactData.error}</h4>}
            </div>
        </div>
        

    )
}

export default ContactPage