import React,{useState, useEffect} from 'react';
import './App.css';
import {unauthRoutes, authRoutes} from './routes'
import {  BrowserRouter as Router } from "react-router-dom";
import Navigation from './components/Navigation/Index'
import firebase from 'firebase'
import 'firebase/auth'

//create context for managing comment viibility
export const CommentContext = React.createContext();

function App() {

  const [user, setUser] = useState('rendering');
  const [commentVisibility, setCommentVisibility] = useState(true)
  
  

  //Trigger firebase User authentication hook
  useEffect(() => {
    firebase.auth().onAuthStateChanged(function(u) {
      if (u) {
        // User is signed in.
        setUser(u);
      } else {
        // No user is signed in.
        setUser(null);
      }
      });
  });

  const handleVisibleClick = () => {
    setCommentVisibility(!commentVisibility)
  }

 

  if(user == 'rendering'){
    return (<h2>قيد التجهيز .. </h2>)
  }


    return (
      <div className="App">
        <Router>
        <CommentContext.Provider value={commentVisibility}>
          {user ? ( <><Navigation commentVisibility = {commentVisibility} handleClick = {handleVisibleClick} />{authRoutes}</>): unauthRoutes}
        </CommentContext.Provider>
       </Router>
      </div>
    );
  }

export default App;