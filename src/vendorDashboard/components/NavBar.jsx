import React from 'react'

const NavBar = ({showLoginhandler,showRegisterhandler,showLogOut,logoutHandler}) => {
  const firmName=localStorage.getItem('firmName')
  return (
    <div className="navSection">
        <div className="company">
            Vendor Dashboard
        </div>
        <div className='firmName'>
          <h4>FirmName:{firmName}</h4>
        </div>
        <div className="userAuth">
           {!showLogOut ? <>
            <span onClick={showLoginhandler}>Login /</span>
            <span onClick={showRegisterhandler}>Register</span>
           </>:
            <span onClick={logoutHandler}>Logout</span> }
           
        </div>
    </div>
  )
}

export default NavBar