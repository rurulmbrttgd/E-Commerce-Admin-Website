import "./transaction.css";

import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUsers, getUsers } from "../../redux/apiCalls";
import { useState } from "react";
import { userRequest } from "../../requestMethods";
import { format } from "timeago.js";
import { axiosInstance } from "../../config";

export default function Transaction() {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
      const getOrders = async () => {
        try {
          const res = await userRequest.get("orders");
          setOrders(res.data);
        } catch {}
      };
      getOrders();
    }, []);
    const handleStatus = async (id) => {
        const item = orders.filter((order) => order._id === id)[0];
        const currentStatus = item.status;
    
        try {
          const res = await axiosInstance.put("http://localhost:5000/api/orders/" + id, {
            status: currentStatus + 1,
          });
          setOrders([
            res.data,
            ...orders.filter((order) => order._id !== id),
          ]);
        } catch (err) {
          console.log(err);
        }
      };
    const Button = ({ type }) => {
      return <button className={"widgetLgButton " + type}>{type}</button>;
    };
    return (
      <div className="widgetLg">
        <h3 className="widgetLgTitle">Latest transactions</h3>
        <table className="widgetLgTable">
          <tr className="widgetLgTr">
            <th className="widgetLgTh">ID</th>
            <th className="widgetLgTh">Date</th>
            <th className="widgetLgTh">Amount</th>
            <th className="widgetLgTh">Payment</th>
            <th className="widgetLgTh">Status</th>
          </tr>
          {orders.map((order) => (
            <tbody key={order._id}>
                <td>{order._id}</td>
                <td>{format(order.createdAt)}</td>
                <td>${order.amount}</td>
                
                <td>
                  {order.method === 0 ? <span>cash</span> : <span>paid</span>}
                </td>
                <td>{[order.status]}</td>
                <td>
                <button onClick={() => handleStatus(order._id)}>
                    Next Stage
                  </button>
                </td>
        
            </tbody>
          ))}
        </table>
      </div>
    );
}
