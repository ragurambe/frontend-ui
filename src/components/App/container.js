import { connect } from "react-redux";

import App from './component';

function mapStateToProps(state) {
    const { spinnerModel } = state;

    return {
        spinner: spinnerModel.spinner
    }
}

function mapDispatchToProps(dispatch) {
    const { registerDetails } = dispatch; 
    return {
        updateFromStorage: (data) => registerDetails.updateFromStorage(data),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);