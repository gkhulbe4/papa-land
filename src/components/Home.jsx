import React, { useEffect, useState } from 'react'
import axios from 'axios'

function Home() {

    const [lands , getLands] = useState([]);

    useEffect((()=>{
        axios.get("http://localhost:3000/lands")
        .then(res => {
            console.log(res.data.lands)
            getLands(res.data.lands)
        })
    }) , [])
  return (
    <div className='flex flex-wrap justify-between gap-8 p-10'>
        {lands.map((land) => (
            <div key={land._id} className="card card-compact w-96 bg-base-100 shadow-xl border border-white transform transition-transform hover:scale-105">
            <figure><img src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="Shoes" /></figure>
            <div className="card-body">
              <h2 className="card-title">{land.title}</h2>
              <p>{land.description}</p>
              <div className="card-actions justify-end">
                <button className="btn btn-primary">Rs.{land.price}</button>
              </div>
            </div>
          </div>
        ))}
    </div>
  )
}

export default Home