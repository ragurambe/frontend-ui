import request from "@Services/apiService";

const initialState = {
  spinner: false,
};

const spinnerModel = {
  state: { ...initialState },

  reducers: {
    updateSpinner(state, spinner) {
      return {
        ...state,
        spinner,
      };
    },
  },

  effects: (dispatch) => ({}),
};

export default spinnerModel;
