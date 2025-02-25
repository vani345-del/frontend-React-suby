import React from 'react'

const SideBar = ({showFirmHandler,showProductHandler,showAllProductshadler,showFirmTitle}) => {
  return (
    <div className="sideBarSection">
        <ul>
          {showFirmTitle ?  <li onClick={showFirmHandler}>Add Firm</li>: ""}
           <li onClick={showProductHandler}>Add Product</li>
           <li onClick={showAllProductshadler}>All Products</li>
           <li>user details</li>

        </ul>
    </div>
  )
}

export default SideBar