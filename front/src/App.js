import logo from './logo.svg';
import './App.css';
import {useState} from 'react';
import {
  createBrowserRouter,
  Link,
  RouterProvider,
} from "react-router-dom";
import AuthWIndow from './views/AuthWIndow';
import MainPage from './views/MainPage';

function App() {

  const router = createBrowserRouter([
    {
      path: '/',
      element: <div>Hello, universe! <Link to='/auth'>Login/Register</Link></div>,
    },
    {
      path: '/auth',
      element: <AuthWIndow/>
    },
    {
      path: '/main',
      element: <MainPage/>
    }
  ])



  return (
    <div className="App">
      <RouterProvider router={router}/>
    </div>
  );
}

export default App;
