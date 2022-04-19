import { connect } from "react-redux";
import { push } from "connected-react-router";
import UserProfile from "./component";

function mapStateToProps(state) {
  const { userModel } = state;

  return {
    userData: userModel.userData,
  };
}

function mapDispatchToProps(dispatch) {
  const { userModel } = dispatch;

  return {
    getUsers: (data) => userModel.getUsers(data),
    updateUserForm: (data) => userModel.updateUserForm(data),
    createUser: (data) => userModel.createUser(data),
    updateUser: (data) => userModel.updateUser(data),
    push: (route) => dispatch(push(route)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
