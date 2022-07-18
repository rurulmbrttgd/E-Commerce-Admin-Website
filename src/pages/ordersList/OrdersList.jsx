
import { DataGrid } from '@material-ui/data-grid'
import { DeleteOutline } from '@material-ui/icons'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { deleteOrder, getOrders } from '../../redux/apiCalls'
import './orderList.css'

export default function OrdersList() {
  const dispatch = useDispatch();
  const {orders} = useSelector((state) => state.order);
  const users = useSelector(state=>state.user.users)
  useEffect(() => {
    getOrders(dispatch);
  }, [dispatch]);
  const handleDelete = (id) => {
    deleteOrder(dispatch, id);
  };

  
  const convertDate = (date) => {
    const [y,m,d,h,min] = date.split(/[-T:]/)
     return`${d}/${m}/${y} ${h}:${min}`
  }
  const columns = [
    {
      field: "_id",
      headerName: "Order ID",
      width: 200
    },
    {
      field: "status",
      headerName: "Status",
      width: 130,
      renderCell: (params) =>
        <span className={`status ${params.row.status}`}>{params.row.status}</span>
    },
    {
      field: "createdAt",
      headerName: "Date",
      width: 150,
      renderCell: (params) => <>{`${convertDate(params.row.createdAt)}`}</>
    },
    {
      field: "action",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => {
        return (
          <Link to={`/order/${params.row._id}`}>
            <button className="orderListEdit">Update</button>
          </Link>
        );
      },
      
    },
    {
      field: "delete",
      headerName: "Delete",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <DeleteOutline
              className="productListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
    
  ];
  
  return <div className="orderList">
    <DataGrid
      rows={orders}
      disableSelectionOnClick
      columns={columns}
      getRowId={(row) => row._id}
      pageSize={15}
      checkboxSelection
    />
    
  </div>
}