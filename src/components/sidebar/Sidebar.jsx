import {
  AddCircleOutlineOutlined, AttachMoney,
  BarChart, ChatBubbleOutline, DynamicFeed, ExitToAppOutlined, ExitToAppSharp, LineStyle, MailOutline, PermIdentity, Receipt, ReceiptOutlined, Report, Storefront, Timeline,
  TrendingUp, WorkOutline
} from "@material-ui/icons";
import { Link } from "react-router-dom";
import "./sidebar.css";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/userRedux";


export default function Sidebar() {
  const user = useSelector(state=>state.user.currentUser);
  const dispatch = useDispatch()
  const handleLogout = () => {
    dispatch(logout())
  }
  console.log(user)
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <ul className="sidebarList">
            <Link to="/" className="link">
            <li className="sidebarListItem">
              <LineStyle className="sidebarIcon" />
              Home
            </li>
            </Link>
            <Link to="/users" className="link">
              <li className="sidebarListItem">
                <PermIdentity className="sidebarIcon" />
                Users
              </li>
            </Link>
            <Link to="/products" className="link">
              <li className="sidebarListItem">
                <Storefront className="sidebarIcon" />
                Products
              </li>
            </Link>
            <Link to="/newproduct" className="link">
              <li className="sidebarListItem">
                <AddCircleOutlineOutlined className="sidebarIcon" />
                Add Product
              </li>
            </Link>
            <Link to="/orders" className="link" >
              <li className="sidebarListItem">
                <ReceiptOutlined className="sidebarIcon" />
                Orders
              </li>
            </Link>
            <Link onClick={() => handleLogout(dispatch)} className="link">
            <li className="sidebarListItem">
              <ExitToAppSharp  className="sidebarIcon" style={{color:"#332e2e"}} />
              Logout
          </li>
        </Link>
          </ul>
        </div>
      </div>
    </div>
  );
}