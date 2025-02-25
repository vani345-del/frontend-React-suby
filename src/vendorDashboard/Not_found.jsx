import React from 'react'
import {Link} from 'react-router-dom'

const Not_found = () => {
  return (
    <div className="errorSection">
        <Link to="/" style={{fontSize:'1.5rem',color:'darkblue'}}>
        <p>Go back</p>
        </Link>
        <h1>404</h1>
        <div>page not found</div>
        
    </div>
  )
}

export default Not_found