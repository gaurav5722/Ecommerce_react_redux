import React, { useState, useEffect } from "react";
import { auth, googleAuthProvider } from "../../firebase";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { ConsoleSqlOutlined } from "@ant-design/icons";
import axios from "axios";
import { createOrUpdateUser } from "../../functions/auth";
import {Checkbox} from 'antd'
const RegisterComplete = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [seller,SetSeller] = useState("no")
  const navigate = useNavigate();
  const { user } = useSelector((state) => ({ ...state }));
  let dispatch = useDispatch();
  useEffect(() => {
    console.log(window.localStorage.getItem("emailForRegistration"));
    setEmail(window.localStorage.getItem("emailForRegistration"));
  }, []);
  //props.history
  // history.push('/dasboard')
  const handleCheckboxChange=(e)=>{
  e.preventDefault();
  console.log("value of the change is--->",e.target.value);
  SetSeller(e.target.value);
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    // validation
    if (!email || !password) {
      toast.error("Email and password is required");
      return;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }
    try {
      const result = await auth.signInWithEmailLink(
        email,
        window.location.href
      );
      console.log("RESULT", result);
      if (result.user.emailVerified) {
        //remove user email from local storage
        window.localStorage.removeItem("emailForRegistration");

        //get user id token
        let user = auth.currentUser;
        await user.updatePassword(password);
        const idTokenResult = await user.getIdTokenResult();
        //redux store
        console.log("user", user, "idTokenResult", idTokenResult);
        createOrUpdateUser(idTokenResult.token,seller)
          .then((res) =>{
            dispatch({
              type: "LOGGED_IN_USER",
              payload: {
                name: res.data.name,
                email: res.data.email,
                token: idTokenResult.token,
                role: res.data.role,
                _id: res.data._id,
              },
            });
          SetSeller("no");
      })
          .catch((err)=>console.log(err));

        //redirect
        navigate("/home");
      }
    } catch (error) {
      //handle the error
      console.log(error);
      toast.error(error.message);
    }
  };
  const CompleteRegisterForm = () => {
    return (
      <form onSubmit={handleSubmit}>
        <input type="email" className="form-control" value={email} disabled />
        <input
          type="password"
          className="form-control"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoFocus
          placeholder="Enter the password"
        />
        <Checkbox className='pb-2 pl-4 pr-4' onChange={handleCheckboxChange} value="yes" >
        Do You Want to become a seller ?
    </Checkbox>
        <button type="submit" className="btn btn-raised mt-3">
          Complete Registration
        </button>
      </form>
    );
  };
  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3 ">
          <h4>Register Completely</h4>

          {CompleteRegisterForm()}
        </div>
      </div>
    </div>
  );
};
export default RegisterComplete;
