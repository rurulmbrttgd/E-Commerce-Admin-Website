import "./userList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUsers, getUsers } from "../../redux/apiCalls";

export default function UserList() {

  const dispatch = useDispatch()
  const users = useSelector(state=>state.user.users)


  useEffect(() => {
    getUsers(dispatch)
  }, [dispatch])
  

  const handleDelete = (id) => {
    deleteUsers(id, dispatch);
  };
  
  const columns = [
    
    { field: "_id", headerName: "ID", width: 220 },
    {
      
      
      field: "user",
      headerName: "User",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="userListUser">
            
            {params.row.username}
            
          </div>
        );
      },
    },
    { field: "email", headerName: "Email", width: 200 },
    {
      field: "isAdmin",
      headerName: "Admin Access",
      width: 220,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/user/" + params.row._id}>
              <button className="userListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="userListDelete"
              onClick={() => handleDelete(params.row._id)}
              
              
            />
            
            
          </>
         
        );  
      },
    },
    
  ];
  

  return (
    <div className="userList">
      <DataGrid
        rows={users}
        disableSelectionOnClick
        columns={columns}
        getRowId={row=>row._id}
        pageSize={50}
        checkboxSelection
      />
    </div>
  );
}
