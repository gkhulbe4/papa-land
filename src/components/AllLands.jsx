import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from "@chakra-ui/react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AllLands() {
  const [lands, setLands] = useState([]);
  const navigate = useNavigate();
  const [deleteLandId, setDeleteLandId] = useState(null);

  const notifyError = () => {
    toast.error("Please Login to Delete Land",{
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
    axios
      .get("http://localhost:3000/lands")
      .then((res) => {
        console.log(res.data.lands);
        setLands(res.data.lands);
      })
      .then((res) => console.log(res));
  }, []);

  const deleteLand = (id) => {
    axios.delete(`http://localhost:3000/lands/${id}`, {
        headers: {
          "Content-type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        location.reload();
        setDeleteLandId(null)
      })
      .catch(() => {
        notifyError();
      })
  };
  return (
    <div>
      {deleteLandId && (
        <Modal
          isOpen={true}
          onClose={() => {
            setDeleteLandId(null);
          }}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Delete Land</ModalHeader>
            <ModalCloseButton />
            <ModalBody>Are you sure you want to delete this land?</ModalBody>

            <ModalFooter>
              <Button
                variant="ghost"
                mr={3}
                onClick={() => {
                  setDeleteLandId(null);
                }}
              >
                Cancel
              </Button>
              <Button colorScheme="red" onClick={() => {
                deleteLand(deleteLandId)
              }}>Delete</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
      <div className="flex flex-wrap justify-between gap-8 p-10">
        {lands.map((land, key) => (
          <div
            key={key}
            className="card card-compact w-96 bg-base-100 shadow-xl border border-white transform transition-transform hover:scale-105"
          >
            <figure>
              <img
                src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
                alt="Shoes"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">
                {land.title}
              </h2>
              <p>{land.description}</p>
              <div className="card-actions justify-end">
                <Button
                  onClick={() => {
                    setDeleteLandId(land?._id);
                  }}
                >
                  Delete
                </Button>

                <button
                  className="btn btn-warning"
                  onClick={() => (window.location = "/edit/" + land._id)}
                >
                  Edit
                </button>
                <button className="btn btn-primary">Rs.{land.price}</button>
              </div>
            </div>
          </div>
        ))}
      </div>
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
  );
}

export default AllLands;
