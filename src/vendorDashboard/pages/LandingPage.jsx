import React from 'react'
import NavBar from '../components/NavBar'
import SideBar from '../components/SideBar'
import Login from '../components/forms/Login'
import Register from '../components/forms/Register'
import AddFirm from '../components/forms/AddFirm'
import AddProduct from '../components/forms/AddProduct'
import Welcom from '../components/Welcom'
import { useState ,useEffect} from 'react'
import AllProducts from '../components/AllProducts'

const LandingPage = () => {
  const [showLogin,setShowLogin]=useState(false); 
  const [showRegister,setShowRegister]=useState(false);
  const [showFirm,setFirm]=useState(false);
  const [showProduct,setProduct]=useState(false);
  const [welcom,setWelcom]=useState(false);
  const [showAllProducts,setAllProducts]=useState(false);
  const [showLogOut,setLogOut]=useState(false);
  const [showFirmTitle,setshowTitle]=useState(true)

  useEffect(()=>{
    const loginToken=localStorage.getItem('loginToken');
    if(loginToken){
      setLogOut(true)
     
    }
  },[])
  

  useEffect(()=>{
    const firmName=localStorage.getItem('firmName');
    if(firmName){
       setshowTitle(false)
    }
  },[])


  const logoutHandler=()=>{
    confirm("are you sure  want to exit")
    localStorage.removeItem('loginToken');
    localStorage.removeItem('firmId');
    localStorage.removeItem('firmName');
    setLogOut(false);
    setshowTitle(true);
  }
  
  
  const showLoginhandler=()=>{
    setShowLogin(true);
    setShowRegister(false);
    setFirm(false)
    setProduct(false)
    setWelcom(false)
    setAllProducts(false)
  }

  const showRegisterhandler=()=>{
    setShowRegister(true);
    setShowLogin(false)
    setFirm(false)
    setProduct(false)
    setWelcom(false)
    setAllProducts(false)
  }
  const showFirmHandler=()=>{
    if(showLogOut){
    setFirm(true)
    setShowRegister(false);
    setShowLogin(false)
    setProduct(false)
    setWelcom(false)
    setAllProducts(false)
    }else{
      alert('please login');
      setShowLogin(true)
    }
  }
  
  const showProductHandler=()=>{
    if(showLogOut){
    setShowRegister(false);
    setShowLogin(false)
    setFirm(false)
    setProduct(true)
    setWelcom(false)
    setAllProducts(false)
    }else{
      alert('please login');
      setShowLogin(true)
    }
  }

  const showWelcomHandler=()=>{
    setShowRegister(false);
    setShowLogin(false)
    setFirm(false)
    setProduct(false)
    setWelcom(true)
    setAllProducts(false)
  }
  
  const showAllProductshadler=()=>{
    if(showLogOut){
    setShowRegister(false);
    setShowLogin(false)
    setFirm(false)
    setProduct(false)
    setWelcom(false)
    setAllProducts(true)
    }else{
      alert('please login');
      setShowLogin(true)
    }
  }

  return (
    <div>
        <NavBar showLoginhandler={showLoginhandler} showRegisterhandler={showRegisterhandler} showLogOut={showLogOut} logoutHandler={logoutHandler}/>
        <div className="collectionSection">
        <SideBar showFirmHandler={showFirmHandler} showProductHandler={showProductHandler} showAllProductshadler={showAllProductshadler} showFirmTitle={showFirmTitle}/>
        {showLogin && <Login showWelcomHandler={showWelcomHandler}/>}
        {showRegister && <Register showLoginhandler={showLoginhandler}/>}
        {showFirm && showLogOut && <AddFirm/>}
        {showProduct  && showLogOut  && <AddProduct/>}
        {welcom && <Welcom/>}
        {showAllProducts  && showLogOut && <AllProducts/>}
        {/*<Login/>*/}
        {/*<Register/>*/}
        {/*<AddFirm/>*/}
        {/*<AddProduct/>*/}
        
        </div>
    </div>
  )
}

export default LandingPage