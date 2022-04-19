import { connect } from "react-redux";
import { push } from "connected-react-router";
import UserProfileList from "./component";

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
    updateUserData: (data) => userModel.updateUserData(data),
    deleteUser: (data) => userModel.deleteUser(data),
    push: (route) => dispatch(push(route)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserProfileList);
