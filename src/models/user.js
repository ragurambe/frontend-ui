import request from "@Services/apiService";

const initialState = {
  clientId: "",
  auth: false,
  usersList: [],
  userData: {
    _id: "",
    firstname: "",
    lastname: "",
    email_address: "",
    phone_number: "",
    profile_picture: "",
  },
};

const userModel = {
  state: { ...initialState },

  reducers: {
    updateUserForm(state, data) {
      return {
        ...state,
        userData: { ...state.userData, ...data },
      };
    },
    updateUserData(state, data) {
      return {
        ...state,
        userData: data,
      };
    },
    updateUsersList(state, data) {
      return {
        ...state,
        usersList: {
          ...state.usersList,
        },
      };
    },
  },

  effects: (dispatch) => ({
    async createUser(payload) {
      try {
        const apiData = await request({
          url: `/users`,
          method: "POST",
          data: payload,
          headers: {},
        });
        return apiData;
      } catch (error) {
        return { status: "failed", message: error.message, error: error };
      }
    },
    async updateUser(payload) {
      try {
        const apiData = await request({
          url: `/users/${payload._id}`,
          method: "PUT",
          data: payload,
          headers: {},
        });
        return apiData;
      } catch (error) {
        return { status: "failed", message: error.message, error: error };
      }
    },
    async getUsers(payload) {
      try {
        const apiData = await request({
          url: `/users`,
          method: "GET",
          data: [],
          headers: {},
        });
        return apiData;
      } catch (error) {
        return { status: "failed", message: error.message, error: error };
      }
    },
    async deleteUser(payload) {
      try {
        const apiData = await request({
          url: `/users/${payload}`,
          method: "DELETE",
          data: [],
          headers: {},
        });
        return apiData;
      } catch (error) {
        return { status: "failed", message: error.message, error: error };
      }
    },
  }),
};

export default userModel;
