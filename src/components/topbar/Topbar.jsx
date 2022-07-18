import React from "react";
import "./topbar.css";
import { NotificationsNone, Language, Settings } from "@material-ui/icons";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Logo = styled.img`
  position: relative; 
  top: 3px;
  right: -20px;
  width: 175px;
  height: 50px;
  cursor: pointer;
`

export default function Topbar() {
  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
        <Link to= "/">
                <Logo onClick="/" src= "https://res.cloudinary.com/dxzvh2xex/image/upload/v1657975075/admin_logo_g9rcuz.png"  />
                </Link>
        </div>
      </div>
    </div>
  );
}
