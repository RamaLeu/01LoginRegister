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
  const [userData, setUserData] = useState('');
  const router = createBrowserRouter([
    {
      path: '/',
      element: <div>Hello, universe! <Link to='/auth'>Login/Register</Link></div>,
    },
    {
      path: '/auth',
      element: <AuthWIndow setUserData={setUserData}/>
    },
    {
      path: '/main',
      element: <MainPage userData={userData}/>
    }
  ])



  return (
    <div className="App">
      <RouterProvider router={router}/>
    </div>
  );
}

export default App;
