import MaterialTable from "material-table";
import React, { Component, forwardRef, useEffect, useState } from "react";
import AddBox from "@material-ui/icons/AddBox";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";
import Pen from "@Assets/images/pen.svg";
import Trash from "@Assets/images/trash.svg";
import AddIcon from "@material-ui/icons/Add";
import {
  Input,
  InputLabel,
  FormControl,
  Select,
  MenuItem,
  Button,
  TextField,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import AlertDialog from "@Components/AlertDialog";

export default function UserProfileList(props) {
  const useStyles = makeStyles((theme) => ({
    margin: {
      margin: theme.spacing(1),
    },
    extendedIcon: {
      marginRight: theme.spacing(1),
    },
  }));

  const [alertPopup, setAlertPopup] = useState();

  const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => (
      <ChevronRight {...props} ref={ref} />
    )),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => (
      <ChevronLeft {...props} ref={ref} />
    )),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => (
      <ArrowDownward {...props} ref={ref} />
    )),
    ThirdStateCheck: forwardRef((props, ref) => (
      <Remove {...props} ref={ref} />
    )),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
  };

  const getRowData = (rowData) => {
    console.log(rowData);

    props.updateUserData({
      ...rowData,
    });
    props.push("/user/editUser");
  };

  async function getDeleteData(rowData) {
    console.log(rowData);
    await props
      .deleteUser(rowData._id)
      .then((result) => {
        if (result && result.status && result.status === "success") {
          setAlertPopup({ ...result, title: "Success", isOpen: true });
        } else {
          setAlertPopup({
            message: result.message,
            title: "Failed",
            status: false,
            isOpen: true,
          });
        }
      })
      .catch((err) => {
        setAlertPopup({
          message: err.message,
          title: "Failed",
          status: false,
          isOpen: true,
        });
      });

    props.push("/");
  }

  const columns = [
    {
      title: "Firstname",
      field: "firstname",
    },
    {
      title: "Lastname",
      field: "lastname",
    },
    {
      title: "Email Address",
      field: "email_address",
    },
    {
      title: "Phone Number",
      field: "phone_number",
    },

    {
      title: "Action",
      field: "action",
      export: false,
      render: (row) => (
        <div>
          <span className="actions m-r-10">
            <img
              className="cursor-pointer"
              src={Pen}
              onClick={() => getRowData(row)}
            />
          </span>
          <span className="actions">
            <img
              className="cursor-pointer"
              src={Trash}
              onClick={() => getDeleteData(row)}
            />
          </span>
        </div>
      ),
    },
  ];

  const tableColumn = () => {
    let tableColData = [];
    columns.map((col) => {
      tableColData.push(col);
    });
    return tableColData;
  };

  const [userData, setUserData] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    props
      .getUsers()
      .then((result) => {
        if (result && result.status) {
          console.log(result.data);
          setUserData(result.data);
        }
      })
      .catch((e) => {
        setUserData([]);
      });
  }, []);

  return (
    <div>
      <div className="row title-container d-flex align-items-center justify-content-between">
        <div className="">List of Users</div>
        <div className="">
          <Button
            variant="contained"
            size="medium"
            color="primary"
            className={classes.margin}
            style={{ borderRadius: 50, fontSize: 11, textTransform: "none" }}
            startIcon={<AddIcon />}
            onClick={() => {
              props.updateUserData({});
              props.push("/user/addUser");
            }}
          >
            Add User
          </Button>
        </div>
      </div>
      <div className="inner-container">
        <div style={{ margin: "10px 10px" }}>
          <MaterialTable
            icons={tableIcons}
            title={false}
            columns={tableColumn()}
            data={userData}
            options={{
              pageSizeOptions: [20, 50, 200],
              pageSize: 20,
              emptyRowsWhenPaging: false,

              headerStyle: {
                fontFamily: "Poppins,sans-serif",
                fontSize: "14px",
                color: "black",
                fontWeight: "600",
              },
            }}
          />
        </div>
      </div>
      <AlertDialog
        title={alertPopup && alertPopup.title}
        description={alertPopup && alertPopup.message}
        isOpen={(alertPopup && alertPopup.isOpen) || false}
        onClose={() => {
          setAlertPopup({ ...alertPopup, isOpen: false });
          if (alertPopup.status) {
            props.push("/");
          }
        }}
      />
    </div>
  );
}
