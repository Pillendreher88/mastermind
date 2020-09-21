import React, {useState} from 'react';
import LoginForm from "./LoginForm.js";
import Register from "./Register.js";
import {Reset} from "../Reset.js";

const LoginRegister = () => {
  
  const [activeKey, setActiveKey] = useState("login");

  return(
      <div className="row justify-content-center">
        <div className="col">
         { activeKey==="register" && 
           (<>
           <Register/>
           <hr/>
           <div className="card text-center"> 
              <div className="card-body">
              <p className= "card-text">Already have an Account?</p>
              <button className="btn btn-primary" onClick = {() => setActiveKey("login")}>
                Login
              </button>
              </div>
            </div>
           </>)}
          {activeKey==="login" &&
           (<>
            <LoginForm onReset = {() => setActiveKey("reset")}/>
            <hr/>
              <div className="card text-center"> 
               <div className="card-body">
                 <p className="card-text"> New User?</p>
              <button className="btn btn-primary" onClick = {() => setActiveKey("register")}>
                Create new Account
              </button>
                </div>
              </div>
           </>)}
          {activeKey==="reset" &&
           <>
           <Reset/>  
           <hr/>
              <div className="card text-center"> 
               <div className="card-body">
              <button className="btn btn-primary" onClick = {() => setActiveKey("login")}>
                Back to Login 
              </button>
                </div>
              </div>
            <hr/>
              <div className="card text-center"> 
               <div className="card-body">
                 <p className="card-text"> New User?</p>
              <button className="btn btn-primary" onClick = {() => setActiveKey("register")}>
                Create New Account
              </button>
                </div>
              </div>
          </>}
        </div>
      </div>
  );
}

export default LoginRegister;