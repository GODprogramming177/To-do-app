import React from "react"
import "./Navbar.css"

const Navbar = (props) => {
  return (
    <>
      <nav className="navbar">
        <span className="appname">MY TODO APP</span>
        <div className="authBtn">
          <button>LOG IN</button>
          <button>SIGN UP</button>
        </div>
      </nav>
    </>
  )
}

export default Navbar
