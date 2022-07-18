import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import app from '../../firebase';
import { addProduct } from "../../redux/apiCalls";
import "./newProduct.css";
import { useSelector } from "react-redux";

const Select = styled.select`
  padding: 10px;
  margin-right: 20px;
  color: #000000;
`;
const Option = styled.option`
  color: #000000;`;
export default function NewProduct() {
  const user = useSelector(state=>state.user.currentUser);
  const {isFetching, error } = useSelector((state)=> state.product);
  console.log(error)
  const [product, setproduct] = useState({
    title: String(),
    desc: String(),
    img: String(),
    categories: "",
    size: "",
    obj: "",
    price: "",
    quantity: 0
  })
  const handleChange = (e) => {
    const { name, value, files } = e.target
    if (files) {
      setproduct({ ...product, [name]: files[0] })
    }
    else
      setproduct({ ...product, [name]: value })
  }
  console.log(product)
  const { 
    title,
    desc,
    categories,
    img,
    obj,
    price,
    quantity } = product

  const dispatch = useDispatch()
  const handleCreate = (e) => {
    e.preventDefault()
    const fileName = new Date().getTime() + img.name
    const storage = getStorage(app)
    const storageRef = ref(storage, fileName)
    const uploadTask = uploadBytesResumable(storageRef, img)
    // Register three observers:
    // 1. 'state_changed' observer, called any time the state changes
    // 2. Error observer, called on failure
    // 3. Completion observer, called on successful completion
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
        }
      },
      (error) => {
        // Handle unsuccessful uploads
        console.error("Error in New product file Line 66", error);
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          const toArray = (str = String()) => str.split(/,/).filter(x => x !== "")
          const newProduct = {
            ...product, img: downloadURL,
            categories: toArray(categories),
            obj: toArray(obj),
            quantity
          }
          addProduct(dispatch, newProduct)
        });
      }
    );
  }

  return (
    <div className="newProduct">
      <h1 className="addProductTitle">Add Product</h1>
      <form className="addProductForm">
        <div className="addProductItem">
          <label htmlFor="title">Title</label>
          <input name="title" type="text" value={title} onChange={handleChange} />
        </div>
        <div className="addProductItem">
          <label htmlFor="description">Description</label>
          <textarea name="desc" cols="10" rows="3" value={desc} onChange={handleChange} ></textarea>
        </div>
        <div className="addProductItem">
          <label htmlFor="categories">Categories{" (seperate with a comma)"}</label>
          <textarea name="categories" cols="10" rows="3" value={categories} onChange={handleChange}></textarea>
        </div>
        <div className="addProductItem">
          <label htmlFor="img">Image</label>
          <input name="img" type="file" accept=".jpg,.png,.jpeg" onChange={handleChange} />
        </div>
        <div className="addProductItem">
          <label htmlFor="price">Price</label>
          <input name="price" type="number" value={price} onChange={handleChange} />
        </div>
        <div className="addProductItem">
          <label htmlFor="obj">Object</label>
          <Select name="obj" onChange={handleChange}>
            <Option disabled selected>
              All
            </Option>
            <Option>table</Option>
            <Option>lamp</Option>
            <Option>chair</Option>
            <Option>cabinet</Option>

          </Select>
        </div>
        <div className="addProductItem">
          <label htmlFor="quantity">Quantities</label>
          <input name="quantity" type="number" value={quantity} onChange={handleChange} />
        </div>
        <button className="addProductButton" onClick={handleCreate}>Create</button>
      </form>
    </div>
  );
}