import { useRef, useContext, useState } from 'react';
import { useHistory } from "react-router-dom";
import AuthContext from '../../store/auth-context';

import classes from './ProfileForm.module.css';

const ProfileForm = () => {
  const history = useHistory();

  const newPassInputRef = useRef();

  const authCtx = useContext(AuthContext);

  const [isLoading, setIsLoading] = useState(false);
  
  const submitHandler = () => {
    //event.preventDefault();

    const enteredNewPass = newPassInputRef.current.value; 

    setIsLoading(true);
    fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDB5xdn9yQ74bgsGwb2zRo6PSkUdr6wjLM',{
      method: 'POST',
      body: JSON.stringify({
        idToken: authCtx.token,
        password: enteredNewPass,
        returnSecureToken: false,
      }),
      headers: {
        'Content-Type' : 'application/json'
      }
    }).then((response) => {
      
      setIsLoading(false);
      if (response.ok) {
        history.replace('/');
        return response.json();
         
      } else {
        history.replace('/');
        return response.json().then((data) => {
          //console.log(data);
          let errorMssg = "Authentication Failed..!";

          if (data && data.error && data.error.message) {
            errorMssg = data.error.message;
          }

          
          throw new Error(errorMssg);
        });
      }

     
    }).then(data => {
      //console.log(data);
      authCtx.login(data.idToken);
      history.replace('/');
      


    }).catch(err=> {
      alert(err.message);
    });
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        {!isLoading && <input type='password' id='new-password' ref = {newPassInputRef} />}
        {isLoading && <p>Sending Request.....</p>}
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
