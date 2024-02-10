import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login() {

    const navigate = useNavigate()

    const [username , setUsername] = useState("");
    const [password , setPassword] = useState("");

    const notifyError = () => {
        toast.error("Wrong credentials",{
          position: "top-center",
          autoClose: 1200,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        })
      };


  return (
    <div>
        <h2>Username</h2>
        <input type="text"
        onChange={(e) => {setUsername(e.target.value)}}
        value={username}
        />

        <h2>Password</h2>
        <input type="password"
         onChange={(e) => {setPassword(e.target.value)}}
         value={password}
        />

        <br />
        <button className="btn btn-outline btn-info"
        onClick={() => {
            axios.post("http://localhost:3000/login" ,{
                username: username, 
                password: password,
            } , {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then((res) => {
                console.log(res.data)
                localStorage.setItem("token" , res.data.token);
                window.location = '/admin'

            })
            .catch(() => {
                notifyError();
            })
            setUsername("");
            setPassword("");
        }}
        >
            Login
        </button>

        <ToastContainer
        position="top-center"
        autoClose={1200}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition: Bounce
        />
    </div>
  )
}

export default Login