import {
  AccountBox,
  AlternateEmail,
  LocalPhone,
  PermIdentity,
  Publish,
  Room,
  VerifiedUser,
} from "@material-ui/icons";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import app from "../../firebase";
import { updateUser } from "../../redux/apiCalls";
import "./user.css";

export default function User() {
  const id = useLocation().pathname.split(/\//)[2]
  const { 
    username,
    firstname,
    lastname,
    email,
    phone,
    address,
    city,
    poostalCode,
    country} = useSelector(state => state.user.users.find(
    ({ _id }) => _id === id
))

  const [data, setdata] = useState({
    username,
    firstname,
    lastname,
    email,
    phone,
    address,
    city,
    poostalCode,
    country
})
const handleUpdate = (e) => {
  setdata((prev) => {
    return { ...prev, [e.target.name]: e.target.value };
  });
};

  const dispatch = useDispatch();

  const onUpdataData = (e) => {
    e.preventDefault()
    updateUser(dispatch, data, id)
}
  return (
    <div className="user">
      <div className="userTitleContainer">
        <h1 className="userTitle">Edit User</h1>
        <Link to="/newUser">
          <button className="userAddButton">Create</button>
        </Link>
      </div>
      <div className="userContainer">
        <div className="userShow">
          <div className="userShowTop">
            <img
              src="https://media.istockphoto.com/vectors/user-icon-flat-isolated-on-white-background-user-symbol-vector-vector-id1300845620?k=20&m=1300845620&s=612x612&w=0&h=f4XTZDAv7NPuZbG0habSpU0sNgECM0X7nbKzTUta3n8="
              alt=""
              className="userShowImg"
            />
            <div className="userShowTopTitle">
              <span className="userShowUsername">{data.fname}</span>
            </div>
          </div>
          <div className="userShowBottom">
            <span className="userShowTitle">Account Details</span>
            <div className="userShowInfo">
              <AccountBox className="userShowIcon" />
              <span className="userShowInfoTitle">{data.username}</span>
            </div>
            <div className="userShowInfo">
              <VerifiedUser className="userShowIcon" />
              <span className="userShowInfoTitle">{data.isAdmin} (Admin Access)</span>
            </div>
            <span className="userShowTitle">Contact Details</span>
            <div className="userShowInfo">
              <LocalPhone className="userShowIcon" />
              <span className="userShowInfoTitle">{data.phone}</span>
            </div>
            <div className="userShowInfo">
              <AlternateEmail className="userShowIcon" />
              <span className="userShowInfoTitle">{data.email}</span>
            </div>
            <div className="userShowInfo">
              <Room className="userShowIcon" />
              <span className="userShowInfoTitle">{data.address}</span>
            </div>
          </div>
        </div>
        <div className="userUpdate">
          <span className="userUpdateTitle">Edit</span>
          <form className="userUpdateForm">
            <div className="userUpdateLeft">
              <div className="userUpdateItem">
                <label>Username</label>
                <input
                name="username"
                  type="text"
                  placeholder={data.username}
                  className="userUpdateInput"
                  onChange={handleUpdate}
                />
              </div>
              
              
              <div className="userUpdateItem">
                <label>Email</label>
                <input
                name="email"
                  type="email"
                  placeholder={data.email}
                  className="userUpdateInput"
                  onChange={handleUpdate}
                />
              </div>
              <div className="userUpdateItem">
                <label>Phone</label>
                <input
                name="phone"
                  type="text"
                  placeholder={data.phone}
                  className="userUpdateInput"
                  onChange={handleUpdate}
                />
                </div>
              <div className="userUpdateItem">
                <label>Address</label>
                <input
                name="address"
                  type="text"
                  placeholder={data.address}
                  className="userUpdateInput"
                 onChange={handleUpdate}
                />
              </div>
            </div>
            <div className="userUpdateRight">
              
              <button className="userUpdateButton" onClick={onUpdataData}
>Update</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
