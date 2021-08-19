import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "users",
  initialState: {
    user: {}
  },
  reducers: {
    addUser: (state, action) => {
      state.user = action.payload;
      console.log(state.user);
      // addNewUser(nwList)
    }
  }
});

// const addNewUser = (list) => {
//   localStorage.setItem("userlist", JSON.stringify(list));
// };

export const { addUser } = userSlice.actions;
export default userSlice.reducer;
