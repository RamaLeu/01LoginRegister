import React, {useEffect, useState} from 'react'
import axios from 'axios';
import {redirect, useNavigate} from "react-router-dom";
import './styles/auth.css';

function AuthWIndow({setUserData}) {

    const navigate = useNavigate();
    const URL = 'http://localhost:3001/api/v1/'

    let [isLogin, setIsLogin] = useState(true);


    let [usernameState, setUsername] = useState('');
    let [passwordState, setPassword] = useState('');
    let [rememberMeState, setRememberMe] = useState(false);

    let [regUsernameState, setRegUsername] = useState('');
    let [regPasswordState, setRegPassword] = useState('');
    let [regEmailState, setRegEmail] = useState('');
    let [regRepeatPass, setRegRepeat] = useState('');

    let [authError, setAuthError] = useState('');

    useEffect(()=>{
        const isRemembered = sessionStorage.getItem("remember_me");
        if(isRemembered){
            axios.post(URL + 'auth/remembered-login', {
                isRemembered: isRemembered
            }).then((response)=>{
                console.log(response);
                setUserData(response.data.data.user)
                navigate('/main');
            }).catch((err)=>{
                console.log(err);
            })
        }
    },[])
    function onLogin(e){
        e.preventDefault();
        axios.post(URL + 'auth/login', {
            "username": usernameState,
            "password": passwordState
        }).then((response)=>{
            console.log(response);
            setUserData(response.data.data.user)
            if(rememberMeState){
                console.log('is remembered');
                sessionStorage.setItem("remember_me", "true");
                navigate('/main');
            }
        }).catch((error)=>{
            console.log(error);
            if(error.response.data.status == 'fail'){
                setAuthError(error.response.data.message);
            }
        })






        // setAuthError('');
        // e.preventDefault();
        // axios.post(URL + 'auth/login', {
        //     "username": usernameState,
        //     "password": passwordState
        // }).then((response)=>{
        //     console.log(response.data.data);
        //     setUserData(response.data.data)
        //     console.log(redirect);
        //     navigate('/main');
        // }).catch((error)=>{
        //     if(error.response.data.status == 'fail'){
        //         setAuthError(error.response.data.message);
        //     }
        // })
    };

    function onRegister(e){
        setAuthError('');
        e.preventDefault();
       console.log(regUsernameState);
       console.log(regPasswordState);
       console.log(regEmailState);
       console.log(regRepeatPass);

       if(regPasswordState != regRepeatPass){
        setAuthError('Passwords do not match!');
       }else{
            axios.post(URL + 'auth/register', {
                "username": regUsernameState,
                "password": regPasswordState,
                "email": regEmailState,
            }).then((response)=>{
                console.log(response);
            }).catch((err)=>{
                console.log(err);
            })

       }





        // setAuthError('');
        // e.preventDefault();
        // if(regPasswordState != regRepeatPass){
        //     setAuthError('Passwords do not match!');
        // }else{
        //     axios.post(URL + 'auth/register', {
        //             "username": regUsernameState,
        //             "email": regEmailState,
        //             "password": regPasswordState
        //     }).then((response)=>{
        //         setUserData(response.data.data);
        //         navigate('/main');
        //     }).catch((error)=>{
        //         if(error.response.data.status == 'fail'){
        //             setAuthError(error.response.data.message);
        //         }
        //     })
        // }
    }

  return (
    <div>
        <div className='switch' onClick={()=>{setIsLogin(!isLogin)}}>{isLogin ? 'Switch to register' : 'Switch to login'}</div>
        {authError && 
            <div>
                {authError}
            </div>
        }
        <div className='auth-window'>
            {isLogin ? <div>
                <form onSubmit={(e)=>onLogin(e)}>
                    <h1>{isLogin ? 'Login' : 'Register'}</h1>
                    <input type="text" className='input-field' value={usernameState} onChange={(e)=>setUsername(e.target.value)} placeholder='username'>

                    </input>
                    <input type="password" className='input-field' value={passwordState} onChange={(e)=>setPassword(e.target.value)} placeholder='password'>
                    
                    </input>
                    <input type="checkbox" className="checkbox" value={rememberMeState} onChange={(e)=>setRememberMe(e.target.value)}/>
                    <span>Remember me</span>
                    <input type="submit" className="submit-btn" value="Login"/>
                </form>
            </div> : 
            <div>
                <form onSubmit={(e)=>onRegister(e)}>
                    <h1>{isLogin ? 'Login' : 'Register'}</h1>
                    <input type="text" className='input-field' value={regUsernameState} onChange={(e)=>setRegUsername(e.target.value)} placeholder='username'/>
                    <input type="text" className='input-field' value={regEmailState} onChange={(e)=>setRegEmail(e.target.value)} placeholder='email'/>

                    <input type="password" className='input-field' value={regPasswordState} onChange={(e)=>setRegPassword(e.target.value)} placeholder='password'/>
                    <input type="password" className='input-field' value={regRepeatPass} onChange={(e)=>setRegRepeat(e.target.value)} placeholder='repeat password'/>

                    <input type="submit" className="submit-btn" value="Login"/>
                </form>
            </div>}
        </div>
    </div>
  )
}

export default AuthWIndow