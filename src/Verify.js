import React, { useState} from 'react';
import {Spinner} from "./Spinner.js";
import axios from "axios";

export const Verify = () => {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();
    const [message, setMessage] = useState();

    function handleClick(event) {
        setLoading(true);
        axios
        .post("/email/resend")
        .then( (response) => {
          setLoading(false);
          setMessage(response.data);
          setError();    
        })
        .catch( (error) => {
            setLoading(false);
            if(error.response && error.response.data.error) {
              setError(error.response.data.error);    
            }
            else {
              console.log(error);     
            }
        });
    }
    const content = message ? <p>A fresh verification link has been sent to your email address. 
                                If you did not receive the email, click <span onClick= {handleClick}>here</span> to
                                request another.
                              </p> : 
                              <p>You need to <strong>verify your email-address</strong> to play ranked. 
                                  We have sent a verification link to your email-address.
                                  If you did not receive the email, click <span onClick= {handleClick}>here</span> to 
                                    request another.
                              </p>


return ( 
             <div className="verify-message">
               {loading ? <Spinner/> : content}     
             </div>   
      );
}