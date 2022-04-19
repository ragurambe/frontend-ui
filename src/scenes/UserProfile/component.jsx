import React, { useState } from "react";
import { getEnv } from "@Services/config";
const API_BASE = getEnv("API_BASE");
import { fileToByteArray } from "@Helpers/utils";
import useForm from "@Helpers/userForm";
import { validate } from "./validation";
import ProfileImage from "@Assets/images/profile1.png";
import {
  Input,
  InputLabel,
  FormControl,
  Select,
  MenuItem,
  Button,
  TextField,
  FormHelperText,
} from "@material-ui/core";
import AlertDialog from "@Components/AlertDialog";

export default function UserProfile(props) {
  const [alertPopup, setAlertPopup] = useState();

  const subdata = (data) => {
    console.log(data);
    console.log(props.userData);
    if (window.location.pathname === "/user/addUser") {
      props
        .createUser(props.userData)
        .then((result) => {
          console.log("user creation response:", result);
          if (result && result.status) {
            setAlertPopup({
              ...result,
              status: true,
              title: "Success",
              isOpen: true,
            });
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
    } else {
      console.log(props.userData);
      props
        .updateUser(props.userData)
        .then((result) => {
          console.log("user updation response:", result);
          if (result && result.status) {
            setAlertPopup({
              ...result,
              status: true,
              title: "Success",
              isOpen: true,
            });
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
    }
  };

  const { values, errors, handleChange, handleSubmit } = useForm(
    subdata,
    validate,
    props.userData
  );
  const [profilePicFile, setProfilePicFile] = useState(
    values.profile_picture
      ? { ...values.profile_picture }
      : { byteAray: "", contentType: "", file: "", name: "" }
  );

  const handleOnChange = (event) => {
    if (event.persist) event.persist();
    props.updateUserForm({ [event.target.name]: event.target.value });
    handleChange({ name: event.target.name, value: event.target.value });
  };

  const handleInputChange = (event) => {
    if (event && event.target && event.target.value) {
      event.target.value = event.target.value.replace(/^\s+/g, "");
      event.target.value = event.target.value.toString();
    }
    handleOnChange(event);
  };

  const handleOnBlur = (event) => {
    if (event && event.target && event.target.value) {
      event.target.value = event.target.value.replace(/^\s+/g, "");
      event.target.value = event.target.value.toString();
    }
    handleOnChange(event);
  };

  const handleProfilePicture = async (e) => {
    const [file] = e.target.files;

    try {
      const byteArray = await fileToByteArray(file);
      const _profile_picture = {
        byteArray,
        file: URL.createObjectURL(file),
        name: file.name,
        contentType: byteArray.split(",")[0].split(";")[0].split(":")[1],
      };
      setProfilePicFile(_profile_picture);
      props.updateUserForm({ profile_picture: byteArray });
      handleChange({ name: "profile_picture", value: byteArray });
    } catch (err) {
      console.log("err", err);
      setProfilePicFile({
        byteArray: "",
        file: "",
        name: "",
        contentType: "",
      });
      props.updateUserForm({ profile_picture: null });
      handleChange({ name: "profile_picture", value: null });
    }
  };
  return (
    <div>
      <section className="user-section">
        <div className="inner-container d-flex justify-content-center">
          <form
            className="irotree-form"
            onSubmit={handleSubmit}
            noValidate
            autoComplete="off"
          >
            <div className="row flex-column">
              <div className="col-md-4 d-flex flex-column align-items-center">
                <div className="MuiFormControl-root formControl">
                  <div className="profile-image mb-4 d-flex flex-column align-items-center">
                    <img
                      id="preview"
                      className="rounded-circle"
                      src={
                        (profilePicFile.byteArray &&
                          profilePicFile.byteArray.length > 0 &&
                          profilePicFile.byteArray) ||
                        props.userData.profile_picture ||
                        ProfileImage
                      }
                      width="120px"
                      height="120px"
                      alt="profile-pic"
                    />
                  </div>
                  <input
                    type="file"
                    name="profile_picture"
                    id="profile_picture"
                    onChange={handleProfilePicture}
                  />
                  {errors && errors.profile_picture && (
                    <FormHelperText className="Mui-error">
                      {errors.profile_picture}
                    </FormHelperText>
                  )}
                </div>
              </div>

              <div className="col-md-4">
                <FormControl className={"formControl"}>
                  <TextField
                    id="firstname"
                    label="Firstname"
                    type="text"
                    name="firstname"
                    value={props.userData.firstname}
                    onChange={handleInputChange}
                    onBlur={handleOnBlur}
                    error={errors && errors.firstname ? true : false}
                    helperText={errors && errors.firstname}
                    autoComplete="off"
                  />
                </FormControl>
                <FormControl className={"formControl"}>
                  <TextField
                    id="lastname"
                    label="Lastname"
                    name="lastname"
                    type="text"
                    value={props.userData.lastname}
                    onChange={handleInputChange}
                    onBlur={handleOnBlur}
                    error={errors && errors.lastname ? true : false}
                    helperText={errors && errors.lastname}
                    autoComplete="off"
                  />
                </FormControl>
                <FormControl className={"formControl"}>
                  <TextField
                    id="email_address"
                    label="Email Address"
                    name="email_address"
                    type="email"
                    value={props.userData.email_address}
                    onChange={handleInputChange}
                    onBlur={handleOnBlur}
                    error={errors && errors.email_address ? true : false}
                    helperText={errors && errors.email_address}
                    autoComplete="off"
                  />
                </FormControl>
                <FormControl className={"formControl"}>
                  <TextField
                    id="phone_number"
                    label="Phone Number"
                    name="phone_number"
                    value={props.userData.phone_number}
                    onChange={handleInputChange}
                    onBlur={handleOnBlur}
                    error={errors && errors.phone_number ? true : false}
                    helperText={errors && errors.phone_number}
                    autoComplete="off"
                  />
                </FormControl>
              </div>
            </div>

            <div className="row d-flex justify-content-center">
              <div className="col-md-12">
                <Button
                  onClick={() => {
                    props.push("/");
                  }}
                  variant="contained"
                  size="medium"
                  color="primary"
                  className={""}
                  style={{
                    borderRadius: 50,
                    fontSize: 18,
                    textTransform: "none",
                  }}
                >
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  size="medium"
                  color="primary"
                  className={""}
                  style={{
                    borderRadius: 50,
                    fontSize: 18,
                    textTransform: "none",
                  }}
                  type="submit"
                >
                  Submit
                </Button>
              </div>
            </div>
          </form>
        </div>
      </section>
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
