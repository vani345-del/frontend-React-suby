import React from 'react'
import { useState } from 'react'
import { API_URL } from '../../data/apiPath';

const Login = ({showWelcomHandler}) => {
  const[email,setEmail]=useState("");
  const[password,setPassword]=useState("");

  const loginHandler=async(e)=>{
    e.preventDefault();
    try {
        const response=await fetch(`${API_URL}/vendor/login`,{
          method:'POST',
          headers:{
          'Content-Type':'application/json'
          },
          body:JSON.stringify({email,password})
          })      

      const data=await response.json();
      if(response.ok){
        alert("Login success fully");
        setEmail("");
        setPassword("");
        showWelcomHandler();
        localStorage.setItem('loginToken',data.token)
      }
      const vendorId=data.vendorId
      console.log("cheking for vendor:",vendorId)
      const vendorResponse=await fetch(`${API_URL}/vendor/single-vendor/${vendorId}`)
      const vendorData=await vendorResponse.json();
      if(vendorResponse.ok){
        const vendorFirmId=vendorData.vendorFirmId;
        console.log(vendorFirmId);
        const vendorFirmName=vendorData.vendor.firm[0].firmName;
        console.log(vendorFirmName)
        console.log("checking for firmId",vendorFirmId)
        localStorage.setItem('firmId',vendorFirmId)
        localStorage.setItem('firmName',vendorFirmName)
        window.location.reload();
      }
    } catch (error) {
      alert("login faild")
      console.log(error);
      
    }
  }

  return (
    <div className="loginSection">
        <form onSubmit={loginHandler}   className='authForm'>
            <h3>Vendor Login</h3>
            <label>Email</label>
            <input type="text" name='email' value={email} onChange={(e)=>setEmail(e.target.value)} placeholder='Enter our Email'/><br/>
            <label>Password</label>
            <input type="password" name='password' value={password}  onChange={(e)=>setPassword(e.target.value)} placeholder='Enter your Password'/><br/>
            <div className="btnSubmit">
                <button  className='btnSubmit' type="submit">Submit</button>
            </div>
        </form>
    </div>
  )
}

export default Login