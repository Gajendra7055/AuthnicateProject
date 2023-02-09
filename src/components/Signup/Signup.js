import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import InputControl from "../InputControl/InputControl";
import '../Signup/Signup.css';
import { auth,app } from "../../firebase";
import { async } from '@firebase/util';
function Signup() {
  const navigates = useNavigate();
  const [values, setValues] = useState({
    name: "",
    email: "",
    pass: "",
  });
  const [errorMsg, setErrorMsg] = useState("");
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);
  const [mynumber, setnumber] = useState("");
  const [otp, setotp] = useState('');
  const [show, setshow] = useState(false);
  const [final, setfinal] = useState('');
  const handleSubmission = () => {
    if (!values.name || !values.email || !values.pass) {
      setErrorMsg("Please fill all fields");
      return;
    }
    setErrorMsg("");
    setSubmitButtonDisabled(true);
    createUserWithEmailAndPassword(auth, values.email, values.pass)
      .then(async (res) => {
        setSubmitButtonDisabled(false);
        const user = res.user;
        await updateProfile(user, {
          displayName: values.name,
        });
        navigates("/SendOTP");
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
      <div className="innerBox">
        <h1 className="heading">Signup</h1>

        <InputControl
          label="Name"
          onChange={(e) =>
            setValues((prev) => ({ ...prev, name: e.target.value }))
          }
          placeholder="Enter your name"
        />
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
            Signup
          </button>
          <p>
            Already have an account?{" "}
            <span>
              <Link to="/login">Login</Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Signup