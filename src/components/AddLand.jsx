import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AddLand() {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState("");
    const [price, setPrice] = useState(0);

    const notifySuccess = () => {
        toast.success('Land Added', {
          position: "top-center",
          autoClose: 1200,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          });
      }
    
      const notifyError = () => {
        toast.error("Please Login to Add Land",{
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
        <h2>Title</h2>
        <input type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
         />

        <h2>Description</h2>
        <input type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)} />

        <h2>Price</h2>
        <input type="text"
        value={price}
        onChange={(e) => setPrice(e.target.value)} />

        <h2>Images</h2>
        <input type="text"
        value={image}
        onChange={(e) => setImage(e.target.value)} />

        <br />
        <button className="btn btn-outline btn-info" 
        onClick={() =>
        {
            axios.post("http://localhost:3000/addland" ,{
                title: title, 
                description: description,
                price: price,
                // image: image
            } , {
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": localStorage.getItem("token")
                }
            })
            .then((res) => {
                console.log(res.data.message);
                notifySuccess();
            })
            .catch((error) => {
                console.error("Error adding land:", error);
                notifyError();
            });
            
            setTitle("");
            setDescription("");
            setPrice("");
            setImage("");
        }}>Add</button>

        <ToastContainer
            position="top-center"
            autoClose={1999}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
       />
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
        />
    </div>

    
  )
}

export default AddLand