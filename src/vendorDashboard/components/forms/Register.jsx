import React from 'react'
import { useState } from 'react'
import { API_URL } from '../../data/apiPath'

const Register = ({showLoginhandler}) => {
  const[username,setuserName]=useState("")
  const[email,setEmail]=useState("")
  const[password,setPassword]=useState("")
  const[error,setError]=useState("true")
  const [showPassword, setShowPassword] = useState(false);


  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };


  const handlerSubmit=async(e)=>{
       e.preventDefault();
       try {
             const response=await fetch(`${API_URL}/vendor/register`,{
              method:'POST',
              headers:{
                'Content-Type':'application/json'
              },
              body:JSON.stringify({username,email,password})
             })
             const data=await response.json();
             if(response.ok){
              console.log(data);
              setuserName("");
              setEmail("");
              setPassword("");
              alert("vendor register success fully")
              showLoginhandler();
             }
             else {
              alert("Registration Failed, Contact Admin")
            }

       } catch (error) {
        console.log("registrarion faild",error);
        alert("registration faild")
       }
  }



  return (
    <div className="registerSection">
        <form onSubmit={ handlerSubmit}  className='authForm'>
            <h3>Vendor Registration</h3>
            <label>UserName</label>
            <input type="text" name='userName' value={username} onChange={(e)=>setuserName(e.target.value)} placeholder='Enter our UserName'/><br/>
            <label>Email</label>
            <input type="text" name='email' value={email} onChange={(e)=>setEmail(e.target.value)} placeholder='Enter our Email'/><br/>
            <label>Password</label>
            <input type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} name='password' placeholder='enter your password' /><br />
<span className='showPassword'
  onClick={handleShowPassword}
>{showPassword ? 'Hide' : 'Show'}</span>
            <div className="btnSubmit">
                <button className='btnSubmit' type="submit">Submit</button>
            </div>
        </form>
    </div>
  )
}

export default Register