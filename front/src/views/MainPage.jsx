import React, { useEffect } from 'react'
import {useNavigate} from "react-router-dom"

function MainPage({userData}) {
    const navigate = useNavigate();


    useEffect(()=>{
      if(!userData){
        navigate('/auth');
      }
    },[])

  return (
    <div>
        <h1>Welcome to main page!</h1>
        <h3>Welcome, {userData}</h3>
    </div>
  )
}

export default MainPage