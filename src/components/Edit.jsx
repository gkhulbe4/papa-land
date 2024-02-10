import axios from 'axios';
import React, { useEffect } from 'react'
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Edit() {
    let { landId } = useParams();
    const [title, setTitle] = useState();
    const [description, setDescription] = useState();
    const [image, setImage] = useState("");
    const [price, setPrice] = useState();

    const notifySuccess = () => {
        toast.success('Land Updated', {
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
        toast.error("Please Login to Update Land",{
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

    useEffect(() => {
        axios.get(`http://localhost:3000/lands/${landId}`,{
            headers: {
                "Authorization": localStorage.getItem("token")
            }
        })
        .then((res) => {
            const result = res.data.land;
            console.log(result)
            setTitle(result.title);
            setDescription(result.description);
            setPrice(result.price)
        })
    } ,[])


  return (
    <div className='flex flex-col justify-center items-center h-screen'>
        <u><h1>EDIT DETAILS :-</h1></u>
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
        onClick={() => {
            axios.put(`http://localhost:3000/lands/${landId}` , {
                title: title,
                description: description,
                price: price,
            }, {
                headers: {
                    "Content-type": "application/json",
                    "Authorization": localStorage.getItem("token")
                }
            }).then((res) => {
                console.log(res.data.message)
                notifySuccess()
            }) 
            .catch(() => {
                notifyError();
            });
        }}
        >
            Update
        </button>

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

export default Edit