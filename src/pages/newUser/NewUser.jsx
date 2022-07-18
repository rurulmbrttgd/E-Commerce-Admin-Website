import { useState } from "react";
import "./newUser.css";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../firebase";
import { addUser } from "../../redux/apiCalls";
import { useDispatch } from "react-redux";

export default function NewUser() {
  const [inputs, setInputs] = useState({});
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleClick = (e) => {
    e.preventDefault();
    const user = {...inputs};
    addUser(user, dispatch);
  }

  return (
    <div className="newUser">
      <h1 className="newUserTitle">New User</h1>
      <form className="newUserForm">
        <div className="newUserItem">
          <label>Username</label>
          <input 
          name="username"
          type="text" 
          placeholder="Juan"
          onChange={handleChange} />
        </div>
        <div className="newUserItem">
          <label>Full Name</label>
          <input 
          name="fname"
          type="text" 
          placeholder="Juan C. Renejay"
          onChange={handleChange} />
        </div>
        <div className="newUserItem">
          <label>Email</label>
          <input 
          name="email"
          type="email" 
          placeholder="juan@gmail.com"
          onChange={handleChange} />
        </div>
        <div className="newUserItem">
          <label>Password</label>
          <input 
          name="password"
          type="password" 
          placeholder="password"
          onChange={handleChange} />
        </div>
        <div className="newUserItem">
          <label>Phone</label>
          <input 
          name="phone"
          type="text" 
          placeholder="+639123456789"
          onChange={handleChange} />
        </div>
        <div className="newUserItem">
          <label>Address</label>
          <input 
          name="address"
          type="text" 
          placeholder="Liliw, Laguna"
          onChange={handleChange} />
        </div>

        <button onClick={handleClick} className="newUserButton">Create</button>
      </form>
    </div>
  );
}
