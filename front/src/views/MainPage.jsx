import React, { useEffect } from 'react'
import {useNavigate} from "react-router-dom"

function MainPage() {
    const navigate = useNavigate();

  return (
    <div>
        <h1>Welcome to main page!</h1>
        <h3>Welcome</h3>
    </div>
  )
}

export default MainPage