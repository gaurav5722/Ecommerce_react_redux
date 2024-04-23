import React, { useState, useEffect } from "react";
import { auth, googleAuthProvider } from "../../firebase";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { ConsoleSqlOutlined } from '@ant-design/icons';
import { Button } from "antd";
import { MailOutlined, GoogleOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
//importing axios
import axios from "axios";
import firebase from 'firebase/compat/app'



import { LoginUser, createOrUpdateUser } from "../../functions/auth";
const Login = ({ history }) => {
  const navigate = useNavigate();
    const { user } = useSelector((state) => ({ ...state }));
   
    useEffect(() => {
      let intended = navigate.state;
      console.log(intended)
      if(intended) {return}
      else{
        if (user && user.token) navigate("/home");
      } 
      }, [user,navigate]);
    
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  
  let dispatch = useDispatch();
  const roleBasedRedirect =(res)=>{
    console.log("Hello"+res.data.role)
    //check if intended
    let intended = navigate.state;
    console.log(intended)
    if(intended)
    {
      navigate(intended.from)
    }
    if(res.data.role==="admin")
    {
      navigate("/admin/dasboard");
    }
    else{
      navigate("/user/history");
    }
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    // console.log("Env->",process.env.REACT_APP_REGISTER_REDIRECT_URL)
    try {
      const result = await auth.signInWithEmailAndPassword(email, password);
      console.log(result);
      const { user } = result;
      const idTokenResult = await user.getIdTokenResult();
      LoginUser(idTokenResult.token)
        .then((res) =>{
          if(res.data === 'user does not exist')
          {
            console.log("user does not exist ");
            toast.error(" user does not exist so you need to register")
            
            navigate('/register')
          }
          else{
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
        
          roleBasedRedirect(res);
          
          }
    })
        .catch((err)=>{console.log(err)});

      toast.success("logged in successfully");
    
      // navigate("/home");
    } catch (error) {
      console.log(error);
      toast.error("The user does not exist and need to register");

      setLoading(false);
      navigate('/register')
    }
    //   to clear the state
    console.log(email, password);
    setEmail("");
  };
  const googleLogin = async () => {
    //login with google
    auth
      .signInWithPopup(googleAuthProvider)
      .then(async (result) => {
        const { user } = result;
        const idTokenResult = await user.getIdTokenResult();
        LoginUser(idTokenResult.token)
          .then((res) =>{
            if(res.data === 'user does not exist')
            {
              console.log("user does not exist i am from google Login");
              toast.error(" user does not exist so you need to register")
              firebase.auth().signOut();
              dispatch({
                  type:"LOGOUT",
                  payload:null
              });
            navigate('/register')
            }
            else{
            console.log("i am from login",res.data);
            dispatch({
              type: "LOGGED_IN_USER",
              payload: {
                name: res.data.name,
                email: res.data.email,
                token: idTokenResult.token,
                role: res.data.role,
                _id: res.data._id,
              },
             });roleBasedRedirect(res);
      }})
          .catch((err)=>{
            console.log(err);
            toast.error(err)
          });

        // naviga("/home");

        setLoading(false);
        navigate("/home");
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.message);
        navigate("/register")
      });
  };
  const LoginForm = () => {
    return (
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your Email"
            autoFocus
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Your Password"
            autoFocus
          />
        </div>
        <Button
          onClick={handleSubmit}
          type="primary"
          className="mb-3"
          block
          shape="round"
          icon={<MailOutlined />}
          size="large"
          disabled={!email || password.length < 6}
        >
          Login with email/Password
        </Button>
      </form>
    );
  };
  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3 ">
          {!loading ? (
            <h4>Login</h4>
          ) : (
            <h4 className="text-danger">Loading...</h4>
          )}
          <h4>{loading}</h4>
          {LoginForm()}
          {loading}
          <Button
            onClick={googleLogin}
            type="primary"
            className="mb-3"
            block
            shape="round"
            icon={<GoogleOutlined />}
            size="large"
          >
            Login with Google
          </Button>
          <Link to={"/forgot/password"} className="float-right text-danger">
            Forgot Password
          </Link>
        </div>
      </div>
    </div>
  );
};
export default Login;
