import { useEffect, useState } from "react";
import { format } from "timeago.js";
import { userRequest } from "../../requestMethods";
import "./widgetLg.css";

export default function WidgetLg() {
  const Button = ({ type }) => {
    return <button className={"widgetLgButton " + type}>{type}</button>;
  };
  const [orders, setOrders] = useState([])
  useEffect(() => {
    userRequest.get("/orders")
      .then(({ data }) => setOrders(data))
      .catch(console.error)
      
  }, [])
  return (
    <div className="widgetLg">
      <h3 className="widgetLgTitle">LATEST TRANSTACTIONS</h3>
      <table className="widgetLgTable">
        <tbody>
          <tr className="widgetLgTr">
            <th className="widgetLgTh">CLIENT</th>
            <th className="widgetLgTh">DATE</th>
            <th className="widgetLgTh">PRICE</th>
            <th className="widgetLgTh">STATUS</th>
          </tr>{
            orders.slice(0,5).map(({ _id: id, amount, createdAt, status }) =>
              <tr key={id} className="widgetLgTr">
                <td className="widgetLgUser">
                  <img
                    src="https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif"
                    alt=""
                    className="widgetLgImg"
                  />
                  <span className="widgetLgName">{id}</span>
                </td>
                <td className="widgetLgDate">{format(createdAt)}</td>
                <td className="widgetLgAmount">{amount}</td>
                <td className="widgetLgStatus">
                  <Button type={status} />
                </td>
              </tr>)}
        </ tbody>
      </table>
    </div>
  );
}
