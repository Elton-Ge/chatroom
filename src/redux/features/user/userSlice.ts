import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface InitialState {
  username: string;
  userRoom: string;
  userIsAuth: boolean;
  userBadgeColor: string;
}
const initialState: InitialState = {
  username: "",
  userRoom: "",
  userIsAuth: false,
  userBadgeColor: "string",
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserName: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
    },
    setUserRoom: (state, action: PayloadAction<string>) => {
      state.userRoom = action.payload;
    },
    setUserIsAuth: (state, action: PayloadAction<boolean>) => {
      state.userIsAuth = action.payload;
    },
    setUserBadgeColor: (state, action: PayloadAction<string>) => {
      state.userBadgeColor = action.payload;
    },
    setUserExitRoom: (state) => {
      state.userRoom = "";
    },
    cleanup: () => initialState,
  },
});
export const {
  setUserName,
  setUserRoom,
  setUserIsAuth,
  setUserBadgeColor,
  setUserExitRoom,
  cleanup,
} = userSlice.actions;
export default userSlice.reducer;
