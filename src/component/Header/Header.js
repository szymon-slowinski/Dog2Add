import React from "react";
import dog2addlogo from '../../assets/img/dog2addlogo.png'
function Header() {
    return(
<div className="flex w-screen z-100 bg-white sticky top-0  justify-between shadow-md">
    <div className="flex items-center">
        <img src={dog2addlogo} alt="logo" className="h-16 m-4" layout="fixed" ></img>
    </div>
    <div className="flex-grow-0"></div>
    <div className="flex">
    </div>
    </div>
    );
}

export default Header;