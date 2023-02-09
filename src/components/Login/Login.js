import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import InputControl from "../InputControl/InputControl";
// import '../Login/Login.css';
import { auth } from "../../firebase";

function Login() {
  const navigates = useNavigate();
  const [values, setValues] = useState({
   email: "",
    pass: "",
  });
  const [errorMsg, setErrorMsg] = useState("");
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);
  const handleSubmission = () => {
    if (!values.email || !values.pass) {
      setErrorMsg("Please fill all fields");
      return;
    }
    setErrorMsg("");
    setSubmitButtonDisabled(true);
    signInWithEmailAndPassword(auth, values.email, values.pass)
      .then(async (res) => {
        setSubmitButtonDisabled(false);
        
        navigates("/home");
        //console.log(user);
      })
      .catch((err) => {
        setSubmitButtonDisabled(false);
        setErrorMsg(err.message);
        // console.log("Error",err)
      });
  }
  return (
    <div className="container">
      <div className= "innerBox">
        <h1 className="heading">Login</h1>

        <InputControl
          label="Email"
          onChange={(e) =>
            setValues((prev) => ({ ...prev, email: e.target.value }))
          }
          placeholder="Enter email address"
        />
        <InputControl
          label="Password"
          onChange={(e) =>
            setValues((prev) => ({ ...prev, pass: e.target.value }))
          }
          placeholder="Enter Password"
        />

        <div className="footer">
          <b className="error">{errorMsg}</b>
          <button 
            disabled={submitButtonDisabled} 
            onClick={handleSubmission}
            >
            Login
          </button>
          <p>
            Already have an account?{" "}
            <span>
              <Link to="/signup">Sign up</Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login