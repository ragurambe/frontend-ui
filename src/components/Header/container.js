import { connect } from 'react-redux';

import Header from "./component";

function mapStateToProps(state) {
    const { userModel } = state;
    
    return {
        userId: userModel.userInfo
    }
}

function mapDispatchToProps(dispatch) {
    const {  } = dispatch;

    return {
        
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
