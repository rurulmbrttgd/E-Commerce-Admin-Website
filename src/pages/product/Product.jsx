import { Link } from "react-router-dom";
import "./product.css";
import Chart from "../../components/chart/Chart"
import { Publish } from "@material-ui/icons";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import { updateProduct } from "../../redux/apiCalls";
import { userRequest } from "../../requestMethods";
import { ref, getDownloadURL, uploadBytesResumable, getStorage } from 'firebase/storage'
import app from "../../firebase"
import styled from "styled-components";


export default function Product() {
    const id = useLocation().pathname.split(/\//)[2]
    const dispatch = useDispatch()
    const { title, quantity, img, desc, categories, obj, price } = useSelector(state => state.product.products.find(
        ({ _id }) => _id === id
    ))
    const [data, setdata] = useState({
        title,
        quantity,
        img,
        desc,
        categories,
        obj,
        price
    })
    const handleUpdate = (e) => {
        const { name, value, files } = e.target
        if (["categories", "sizes", "colors"].includes(name))
            setdata(d => ({ ...d, [name]: value.split(",") }))
        else if (files) {
            const fileName = new Date().getTime() + files[0].name
            const storage = getStorage(app)
            const storageRef = ref(storage, fileName)
            const uploadTask = uploadBytesResumable(storageRef, files[0])
            uploadTask.on(
                "state_changed",
                (snapshot) => {
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
                    console.error("Error in New product file Line 36", error);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        setdata(d => ({ ...d, [name]: downloadURL }))
                    });
                }
            );
        }
        else
            setdata(d => ({ ...d, [name]: value }))
    }
    const onUpdataData = (e) => {
        e.preventDefault()
        updateProduct(dispatch, data, id)
    }

    const [pStats, setPStats] = useState([])
    const MONTHS = useMemo(() => ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Agu", "Sep", "Oct", "Nov", "Dec"]
        , [])

    useEffect(() => {
        const getStats = async () => {
            try {
                const res = await userRequest.get("orders/income?pid=" + id)
                res.data
                    .sort((a, b) => a.year - b.year || a._id - b._id)
                    .map(
                        (item) => setPStats(
                            (prev) => [...prev, { name: MONTHS[item._id - 1], Sales: item.total }]
                        )
                    )
            } catch (error) {
                console.error("Error in useEffect in product.jsx", error);
            }
        }
        getStats()
    }, [MONTHS, id])

    return (
        <div className="product">
            <div className="productTitleContainer">
                <h1 className="productTitle">Product</h1>
                <Link to="/newproduct">
                    <button className="productAddButton">Create</button>
                </Link>
            </div>
            <div className="productTop">
                <div className="productTopLeft">
                    <Chart data={pStats} dataKey="Sales" title="Sales Performance" />
                </div>
                <div className="productTopRight">
                    <div className="productInfoTop">
                        <img src={img} alt="" className="productInfoImg" />
                        <span className="productName">{title}</span>
                    </div>
                    <div className="productInfoBottom">
                        <div className="productInfoItem">
                            <span className="productInfoKey">id:</span>
                            <span className="productInfoValue">{` ${id}`}</span>
                        </div>
                        <div className="productInfoItem">
                            <span className="productInfoKey">Sales:</span>
                            <span className="productInfoValue">{pStats.reduce(
                                (acc, cur) => acc + cur.Sales, 0
                            )}</span>
                        </div>
                        <div className="productInfoItem">
                            <span className="productInfoKey">Stock:</span>
                            <span className="productInfoValue">{quantity ? "Yes" : "No"}</span>
                        </div>
                        <div className="productInfoItem">
                            <span className="productInfoKey">Quantity:</span>
                            <span className="productInfoValue">{data.quantity}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="productBottom">
                <form className="productForm">
                    <div className="productFormLeft">
                        <label>Update Product Details</label>
                        <input name="title" type="text" value={data.title} onChange={handleUpdate} />
                        <label>Description</label>
                        <textarea name="desc" cols="5" rows="3" value={data.desc} onChange={handleUpdate} ></textarea>
                        <label>categories</label>
                        <textarea name="categories" cols="5" rows="2" value={data.categories} onChange={handleUpdate} ></textarea>
                        <label>Object</label>
                        <textarea name="obj" cols="5" rows="3" value={data.obj} onChange={handleUpdate} ></textarea>
                    </div>
                    <div className="productFormCenter">
                        <label>Price</label>
                        <input name="price" type="number" value={data.price} onChange={handleUpdate} />
                        <label>Quantity</label>
                        <input name="quantity" type="number" value={data.quantity} onChange={handleUpdate} />
                    </div>
                    <div className="productFormRight">
                        <div className="productUpload">
                            <img src={img} alt="" className="productUploadImg" />
                            <label htmlFor="file">
                                <Publish />
                            </label>
                            <input type="file" id="file" name="img" onChange={handleUpdate} style={{ display: "none" }} />
                        </div>
                        <button className="productButton" onClick={onUpdataData}>Update</button>
                    </div>
                </form>
            </div>
        </div>
    );
}