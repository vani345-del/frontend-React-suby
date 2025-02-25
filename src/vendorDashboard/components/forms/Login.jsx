import React from 'react'
import { useState } from 'react'
import { API_URL } from '../../data/apiPath';

const Login = ({showWelcomHandler}) => {
  const[email,setEmail]=useState("");
  const[password,setPassword]=useState("");
  
  const [showPassword, setShowPassword] = useState(false)

  const handleShowPassword = ()=>{
    setShowPassword(!showPassword);
  }
  


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
        localStorage.setItem('loginToken',data.token)
        showWelcomHandler();
        
      }
      const vendorId=data.vendorId
      console.log("cheking for vendor:",vendorId)
      const vendorResponse=await fetch(`${API_URL}/vendor/single-vendor/${vendorId}`)
      window.location.reload()
      const vendorData=await vendorResponse.json();
      if(vendorResponse.ok){
        const vendorFirmId=vendorData.vendorFirmId;
        const vendorFirmName=vendorData.vendor.firm[0].firmName;
        console.log("checking for firmId",vendorFirmId)
        localStorage.setItem('firmId',vendorFirmId)
        localStorage.setItem('firmName',vendorFirmName)
        
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
            <input   type={showPassword? "text":"password"} name='password' value={password} onChange={(e)=>setPassword(e.target.value)} placeholder='enter your password'/><br />
            <span className='showPassword'
              onClick={handleShowPassword}
              >{showPassword ? 'Hide' : 'Show'}</span>
            <div className="btnSubmit">
                <button  className='btnSubmit' type="submit">Submit</button>
            </div>
        </form>
    </div>
  )
}

export default Login