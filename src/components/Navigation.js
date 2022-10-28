import React from 'react'
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


function Navigation({userObj}) {
  return (
      <nav>
        <ul style={{display: "flex", justifyContent: "center", marginTop: 50}}>
          <li><Link to={"/"} style={{marginRight:10}}><FontAwesomeIcon icon="fa-brands fa-twitter" color={"#04aaff"} size="2x"/></Link></li>
          <li><Link style={{display: "flex", flexDirection:"column", marginLeft:10, alignItems: "center", fontSize:12}} to={"/Profile"}><FontAwesomeIcon icon="fa-solid fa-user" color={"#04aaff"} size="2x"/>
          <span style={{marginTop:10}}>{userObj.displayName ? `${userObj.displayName} Profile` : "Profile"}</span>
          </Link></li>
        </ul>
      </nav>
  )
}

export default Navigation;
